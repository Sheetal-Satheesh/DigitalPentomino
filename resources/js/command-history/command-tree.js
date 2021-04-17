if (typeof require != 'undefined') {
    Command = require('./command-node.js');
    CommandPath = require('./command-path.js');
}

const UNDO = 1;
const REDO = 1 << 1;
const SearchStrategy = { "Top2Bottom": 1, "BottomUp": 1 << 1 };
Object.freeze(SearchStrategy);

class CommandTree {
    constructor() {
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
        this._lastComandNode = undefined;
        this._operationStatus &= ~(UNDO & REDO);
    }

    Clean() {
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
        this._lastComandNode = undefined;
        this._operationStatus &= ~(UNDO & REDO);
    }

    _insert(current, parent, command) {
        if (current == undefined) {
            current = new CommandNode(command);
            if (parent == undefined) {
                return current;
            } else {
                if ((this._operationStatus & UNDO) != UNDO) {
                    return current;
                }
                parent.AddChild(current);
                this._currentCmdNode = current;
                return parent;
            }
        }

        parent = current;
        if (current == this._currentCmdNode) {
            current = new CommandNode(command);
            this._currentCmdNode = current;
            parent.AddChild(current);
            return parent;
        }

        if (current.Children().length != 0) {
            current = current.ChildTopNode();
        }
        else {
            current = undefined;
        }

        current = this._insert(current, parent, command);

        return parent == current.Parent() ? parent : current;
    }

    Insert(command) {
        this._rootCmdNode = this._insert(this._rootCmdNode, this._rootCmdNode, command);
        if (this._currentCmdNode == undefined) {
            this._currentCmdNode = this._rootCmdNode;
        }
        this._lastComandNode = this._currentCmdNode;
        this._operationStatus &= ~REDO;
        this._operationStatus |= UNDO;

        return this._currentCmdNode;
    }

    SearchCmdNode(current, key) {
        if (current == undefined) {
            return undefined;
        }

        if (current.Key() == key) {
            return current;
        }

        let retNode = undefined;
        for (let indx = 0; indx < current.Children().length; ++indx) {

            let childs = current.Children();
            retNode = this.SearchCmdNode(
                childs[indx],
                key);

            if (retNode != undefined) {
                return retNode;
            }
        }

        return retNode;
    }

    CollectCmdKeySequences(
        currNode,
        startKey,
        endKey,
        searchType) {


        if (currNode == undefined) {
            return undefined;
        }

        if (currNode.Key() == startKey) {
            searchType |= SearchStrategy.Top2Bottom;
            if ((SearchStrategy.BottomUp & searchType) != 0) {
                return [currNode._key];
            }
        }

        if (currNode.Key() == endKey) {
            searchType |= SearchStrategy.BottomUp;
            if ((SearchStrategy.Top2Bottom & searchType) != 0) {
                return [currNode._key];
            }
        }
        let cmdKeySeq = [];
        for (let indx = 0; indx < currNode.Children().length; ++indx) {

            let childs = currNode.Children();
            let commandKeys = this.CollectCmdKeySequences(
                childs[indx],
                startKey,
                endKey,
                searchType
            );

            if (commandKeys.length != 0) {
                if (!cmdKeySeq.find(key => key === currNode._key)) {
                    cmdKeySeq.push(currNode._key);
                }
                commandKeys.forEach(cmdKey => {
                    cmdKeySeq.push(cmdKey);
                });
            }
        }

        if (cmdKeySeq.length == 0) {
            cmdKeySeq.push(currNode._key);
        }

        return cmdKeySeq;
    }

    CollectCmdSequences(
        currNode,
        startKey,
        endKey,
        searchType) {


        if (currNode == undefined) {
            return undefined;
        }

        if (currNode.Key() == startKey) {
            searchType |= SearchStrategy.Top2Bottom;
            if ((SearchStrategy.BottomUp & searchType) != 0) {
                return {
                    seqType: SearchStrategy.BottomUp,
                    commands: [currNode.Command()]
                };
            }
        }

        if (currNode.Key() == endKey) {
            searchType |= SearchStrategy.BottomUp;
            if ((SearchStrategy.Top2Bottom & searchType) != 0) {
                return {
                    seqType: SearchStrategy.Top2Bottom,
                    commands: [currNode.Command()]
                };
            }
        }

        let retObj = {
            seqType: 0,
            commands: []
        };

        let searchValue = searchType;
        for (let indx = 0; indx < currNode.Children().length; ++indx) {
            let childs = currNode.Children();
            let cmdObj = this.CollectCmdSequences(
                childs[indx],
                startKey,
                endKey,
                searchValue
            );

            if (searchType) {
                if (!retObj.commands.find(cmd => cmd._pentomino === currNode.Command()._pentomino)) {
                    retObj.commands.push(currNode.Command());
                }
            } else {
                searchValue = cmdObj.seqType;
            }

            retObj.seqType = cmdObj.seqType;
            retObj.commands = [...retObj.commands, ...cmdObj.commands];


        }

        if (searchType &&
            retObj.seqType == 0) {
            retObj.seqType = searchType;
            retObj.commands.push(currNode.Command());
        }


        return retObj;
    }

    MoveUp() {
        let current = undefined;

        if (this._currentCmdNode == undefined) {
            if (this._rootCmdNode == undefined) {
                this._operationStatus &= ~(UNDO & REDO);
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }

        }
        if ((this._operationStatus & UNDO) != UNDO) {
            console.error("Undo not Possible");
            return undefined;

        }

        if (this._currentCmdNode.Key() === this._currentCmdNode.Parent().Key()) {
            current = this._currentCmdNode;
            this._operationStatus &= ~UNDO;
            this._currentCmdNode = undefined;
            return current.Command();
        }
        else {
            current = this._currentCmdNode;
            this._currentCmdNode = this._currentCmdNode.Parent();
            this._operationStatus |= (UNDO | REDO);
            return current.Command();
        }
    }

    NextBranchNode(current, target) {
        let retCurrent, firstNode;
        if (current == undefined) {
            console.error("Node undefined");
            return [undefined, firstNode];
        }
        else if (target == current) {
            if (target.Children().length == 0) {
                return [target, firstNode = true];
            }
            return [target.Children()[0], firstNode];
        }
        else if (current.Children().length == 0) {
            return [current, firstNode];
        }

        for (let prevIndex = 0, index = 0;
            index < current.Children().length; ++index) {

            let child = current.Children();
            if (index != prevIndex) {
                if (firstNode == true) {
                    return [child[index], firstNode];
                }
                if (child[index] == target) {
                    return [target.Children()[0], firstNode];
                }
            }
            [retCurrent, firstNode] = this.NextBranchNode(child[index], target, firstNode);
            prevIndex = index;
            if (retCurrent.Parent() == target) {
                return [retCurrent, firstNode];
            }
        }

        return [current, firstNode];
    }

    /**
     * TODO:// extensive support 
     * @returns 
     */

    MoveDown() {
        let current = undefined;
        if (this._currentCmdNode == undefined) {
            if (this._rootCmdNode == undefined) {
                this._operationStatus &= ~(UNDO & REDO);
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }
            else {
                this._currentCmdNode = this._rootCmdNode;
                this._operationStatus |= UNDO;
                return this._currentCmdNode.Command();
            }
        }

        if ((this._operationStatus & REDO) != REDO) {
            console.error("Redo not Possible");
            return undefined;
        }

        if (this._currentCmdNode.Children().length == 0) {
            current = this._currentCmdNode;
            this._operationStatus &= ~REDO;
            return undefined;
        }
        else {
            current = this._currentCmdNode;
            this._currentCmdNode = current.ChildTopNode();
            this._operationStatus |= (UNDO | REDO);
            return this._currentCmdNode.Command();
        }
    }

    CommandSequences(startKey, endKey) {
        let startNode = this.SearchCmdNode(this._rootCmdNode, startKey);
        if (startNode == undefined) {
            console.error("Search Failed: Node with key" +
                startKey + "Not Found");
            return undefined;
        }

        let endNode = this.SearchCmdNode(this._rootCmdNode, endKey);
        if (endNode == undefined) {
            console.error("Search Failed: Node with key" +
                endKey + "Not Found");
            return undefined;
        }

        let cmdSequences = this.CollectCmdSequences(
            this._rootCmdNode,
            startNode,
            endNode);

        return cmdSequences;
    }

    isEmpty() {
        return this.isAtRoot() && this.isAtLeaf();
    }

    isAtRoot() {
        return this._currentCmd === this._rootCmdNode;
    }

    isAtLeaf() {
        return this._currentCmd.getChildren().length === 0;
    }

    Root() {
        return this._rootCmdNode;
    }

    RootCmdKey() {
        if (this._rootCmdNode != undefined) {
            return this._rootCmdNode.Key();
        }
        return undefined;
    }

    Current() {
        return this._currentCmdNode;
    }

    PositionCurrent(cmdKey) {
        this._currentCmdNode = this.SearchCmdNode(this._rootCmdNode, cmdKey);
    }

    CurrentCmdKey() {
        if (this._currentCmdNode != undefined) {
            return this._currentCmdNode.Key();
        }
        return undefined;
    }

    Leaf() {
        return this._lastComandNode;
    }

    LeafCmdKey() {
        if (this._lastComandNode != undefined) {
            return this._lastComandNode.Key();
        }
        return undefined;
    }

    Flush() {
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
    }
}

if (typeof module != 'undefined') {
    module.exports = CommandHistoryTree;
}

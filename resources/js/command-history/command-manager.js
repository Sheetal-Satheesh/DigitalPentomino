if (typeof require != 'undefined') {
    CommandHistoryTree = require('./command-tree.js');
}

const NodeOrder = {
    "First": 1,
    "Middle": 2,
    "Last": -1,
    "Unknown": 0
};
Object.freeze(NodeOrder);

class CommandManager {
    constructor() {
        this._cmdTree = new CommandTree();
    }

    Reset() {
        this._cmdTree.Clean();
    }

    Seach(key) {
        this._cmdTree.search(this._cmdTree.Root(), key);
    }

    ExecCommand(command, cmdProperty = cmdAttrDefault) {

        var fController = new FrontController();
        let game = fController.controller.game();

        let cmdType = cmdProperty.cmdType;
        let cmdSeq = cmdProperty.cmdSeq;
        let isSuccess = true; // Get return value of success or error from
        let currNode = undefined;

        if (cmdType == CommandTypes.None) {
            return;
        }

        if (cmdType == CommandTypes.Original) {
            currNode = this._cmdTree.Insert(command);
        }

        let cmdVal = command.ExecValues();
        switch (command.Name()) {
            case "Place":
                game.placePentomino(cmdVal.Pentomino, cmdVal.PosX, cmdVal.PosY);
                break;

            case "Remove":
                game.removePentomino(cmdVal.Pentomino);
                break;

            case "RotateClkWise":
                game.rotatePentominoClkWise(cmdVal.Pentomino);
                break;

            case "RotateAntiClkWise":
                game.rotatePentominoAntiClkWise(cmdVal.Pentomino);
                break;

            case "MirrorH":
                game.mirrorPentominoH(cmdVal.Pentomino);
                break;

            case "MirrorV":
                game.mirrorPentominoV(cmdVal.Pentomino);
                break;

            default:
                isSuccess = false;
                throw new Error("Invalid Command Found: " + command.name);
                //TODO: add commund related flag variable
                break;

        }

        currNode = this._cmdTree.Current();
        if (isSuccess && (currNode != undefined)) {
            game.updateCmdKey(currNode.Key());
            /*
                console.info("Root Key: "+ this._cmdTree.RootKey());
                console.info("Current Key: "+ this._cmdTree.CurrentKey());
            */
        }

        return command;
    }

    StartCmdKey() {
        return (
            (this._cmdTree.Root().Key() != undefined)
                ? this._cmdTree.Root().Key()
                : undefined
        );
    }

    LastCmdKey() {
        return (
            (this._cmdTree.Leaf().Key() != undefined)
                ? this._cmdTree.Leaf().Key()
                : undefined
        );
    }

    CurrentCmdKey() {
        return (
            (this._cmdTree.Current().Key() != undefined)
                ? this._cmdTree.Current().Key()
                : undefined
        );
    }

    NodeCount() {
        return this._cmdTree.NodeCount();
    }

    IsKeyFound(key) {
        let retNode = this._cmdTree.SearchCmdNode(
            this._cmdTree.Root(), key);
        if (retNode != undefined) {
            return true;
        } else {
            return false;
        }
    }

    CmdKeySeqType(startKey, endKey) {
        return this._cmdTree.GetSequeneType(this._cmdTree.Root(), startKey, endKey);
    }

    IsUndoPossible() {
        return !(this._cmdTree.isAtRoot());
    }

    Undo() {
        let current = this._cmdTree.Current();
        if (current == undefined) {
            if (this._cmdTree.Root() == undefined) {
                console.error("Command Tree is Emty: Game is not Started");
            } else {
                console.error("Undo not possible");
            }

            return undefined;
        }

        let parent = current.Parent();
        let branch = current.BranchLeft();
        if (branch != undefined) {
            let leaf = this._cmdTree.LeafNode(branch);

            current.AddBranchLeft(undefined);
            if (this._cmdTree.NodePosition(branch) == NodeOrder.First) {
                current.AddBranchRight(branch);
            }
            this.AdjustCurrCmd(leaf.Key());
            if (branch.Key() == leaf.Key()) {
                return [branch.Command().ExecValues()];
            }
            let [cmdSeq, seqType] = this.CmdSequences(branch.Key(), leaf.Key());
            return cmdSeq;
        }

        if (current.Key() === parent.Key()) {
            this.AdjustCurrCmd(undefined);
            return [current.Command().ExecUndoValues()];
        }

        let siblings = current.Siblings();
        for (let iter = 0; iter < siblings.length && siblings.length > 1; ++iter) {
            if (siblings[iter].Key() == current.Key() &&
                this._cmdTree.NodePosition(current) != NodeOrder.First) {
                parent.AddBranchLeft(siblings[iter - 1]);
                parent.AddBranchRight(current);
            }
        }

        this.AdjustCurrCmd(parent.Key());
        return [current.Command().ExecUndoValues()];
    }

    Redo() {

        let current = this._cmdTree.Current();
        if (current == undefined) {
            if (this._cmdTree.Root() == undefined) {
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }
            else {
                this.AdjustCurrCmd(this._cmdTree.Root().Key());
                let commands = this._cmdTree.Current().Command();
                return [commands.ExecValues()];
            }
        }

        let branch = current.BranchRight();
        if (branch != undefined) {
            /** Take right branch*/
            let childs = current.Children();
            for (let iter = 0; iter < childs.length; ++iter) {
                if (childs[iter].Key() == current.Key() && iter != childs.length) {
                    current.AddBranchLeft(childs[iter - 1]);
                    current.AddBranchRight(undefined);
                }
            }
            this.AdjustCurrCmd(branch.Key());
            return [branch.Command().ExecValues()];

        }

        if (current.Children().length == 0) {
            let branchNode = this._cmdTree.NextBranchNode(current);
            if (branchNode != undefined) {
                branchNode.Parent().AddBranchRight(branchNode);
                this.AdjustCurrCmd(branchNode.Parent().Key());
                let currBranchTop = this._cmdTree.PrevBranchNode(branchNode);
                if (current.Key() == currBranchTop.Key()) {
                    return [current.Command().ExecUndoValues()];
                }
                let [cmdSeq, seqType] = this.CmdSequences(current.Key(), currBranchTop.Key());
                return cmdSeq;
            }
        }
        else {
            this.AdjustCurrCmd((current.Children())[0].Key());
            let commands = this._cmdTree.Current().Command();
            return [commands.ExecValues()];
        }
    }

    RedoCommandsAll() {
        return this._cmdTree.getLastCommand().getChildren();
    }

    CmdTree() {
        return this._cmdTree;
    }

    AdjustCurrCmd(key) {
        this._cmdTree.PositionCurrent(key);
    }

    
    /*** Code not used anymore */

    CmdSequences(startKey, endKey) {
        if (startKey == undefined) {
            startKey = this.StartCmdKey();
        }
        let cmdObj = this._cmdTree.CmdSequences(
            startKey,
            endKey);

        // if (cmdObj.seqType == 2) {
        //     cmdObj.commands = cmdObj.commands.reverse();
        // }

        let cmdSequences = [];
        cmdObj.commands.forEach((command) => {
            if (cmdObj.seqType == 1) {
                cmdSequences.push(command.ExecValues());

            } else {
                cmdSequences.push(command.ExecUndoValues());
            }
        }, this);
        return [cmdSequences, cmdObj.seqType];
    }

    /*************************/
}


if (typeof module != 'undefined') {
    module.exports = CommandManager;
}

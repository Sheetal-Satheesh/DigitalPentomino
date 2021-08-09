if (typeof require != 'undefined') {
    CommandHistoryTree = require('./command-tree.js');
}

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
        else if (cmdType == CommandTypes.Local) {
            if (cmdSeq == CommandSeq.Forward) {
                this._cmdTree.MoveDown();
            }
            else if (cmdSeq == CommandSeq.Backward) {
                this._cmdTree.MoveUp();
            }
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
        return this._cmdTree.RootCmdKey();
    }

    LastCmdKey() {
        return this._cmdTree.LeafCmdKey();
    }

    CurrentCmdKey() {
        return this._cmdTree.CurrentCmdKey();
    }

    NodeCount() {
        return this._cmdTree.NodeCount();
    }

    CurrentCmdOrder() {
        if (this.CurrentCmdKey() == undefined) {
            return 1;
        }
        else if (this.CurrentCmdKey() == this.RootCmdKey) {
            return 1 << 1;
        }
        else if (this.CurrentCmdKey() == this.LastCmdKey()) {
            return 1 << 2;
        }
        else {
            return 1 << 3;
        }
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

    ExecCmdSequence(cmdSequence, onUndo, onRedo) {
        if (cmdSequence.getStart() != this._cmdTree.getLastCommand()) {
            throw new Error(
                "State Error:" +
                "Current state is not start state of cmdSequence");
        }

        for (let index = 0; index < cmdSequence.getNumOfUndoCommands(); index++) {
            onUndo(this.undo());
        }
        cmdSequence.getRedoCommands().forEach(command => {
            onRedo(this.redo(command));
        });
    }

    JumptToCommand(command) {
        let cmdSequence = this._cmdTree.getPathToCommand(command);
        let executedCommands = [];
        for (let i = 0; i < cmdSequence.getNumOfUndoCommands(); i++) {
            executedCommands.push(this.undo());
        }
        cmdSequence.getRedoCommands().forEach(command => {
            executedCommands.push(this.redo(command));
        });
        return executedCommands;
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
            if (this._cmdTree.NodePosition(branch) == 1) {
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

        let siblings = parent.Children();
        for (let iter = 0; iter < siblings.length && siblings.length > 1; ++iter) {
            if (siblings[iter].Key() == current.Key() && iter != 0) {
                parent.AddBranchLeft(siblings[iter - 1]);
                parent.AddBranchRight(current);
            }
        }

        this.AdjustCurrCmd(parent.Key());
        return [current.Command().ExecUndoValues()];
    }

    Redo() {

        let current = this._cmdTree.Current();
        let commands = undefined;
        if (current == undefined) {
            if (this._cmdTree.Root() == undefined) {
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }
            else {
                this.AdjustCurrCmd(this._cmdTree.Root().Key());
                commands = this._cmdTree.Current().Command();
                return [commands.ExecValues()];
            }
        }
        let branch = current.BranchRight();
        if (branch != undefined) {
            let siblings = current.Children();
            for (let iter = 0; iter < siblings.length; ++iter) {
                if (siblings[iter].Key() == current.Key() && iter != siblings.length) {
                    current.AddBranchLeft(siblings[iter - 1]);
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
            commands = this._cmdTree.Current().Command();
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
}

if (typeof module != 'undefined') {
    module.exports = CommandManager;
}

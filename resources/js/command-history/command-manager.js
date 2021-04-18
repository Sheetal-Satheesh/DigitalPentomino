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
        if (cmdType == CommandTypes.Original) {
            currNode = this._cmdTree.Insert(command);
        }
        else {
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

    IsKeyFound(key) {
        let retNode = this._cmdTree.SearchCmdNode(
            this._cmdTree.Root(), key);
        if (retNode != undefined) {
            return true;
        } else {
            return false;
        }
    }

    CmdKeySequences() {

        let startKey = this._cmdTree.RootCmdKey();
        let endKey = this._cmdTree.LeafCmdKey();
        let cmdKeySeq = this._cmdTree.CollectCmdKeySequences(
            this._cmdTree.Root(),
            startKey,
            endKey, 0);

        return cmdKeySeq;
    }

    CmdSequences(startKey, endKey) {
        if (startKey == undefined) {
            startKey = this.StartCmdKey();
        }

        let cmdObj = this._cmdTree.CollectCmdSequences(
            this._cmdTree.Root(),
            startKey,
            endKey, 0);

        console.log(cmdObj);
        if (cmdObj.seqType == 2) {
            cmdObj.commands = cmdObj.commands.reverse();
        }

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
        let command = this._cmdTree.MoveUp();
        if (command == undefined) {
            return undefined;
        }
        return command.ExecUndoValues();

    }

    Redo() {
        let command = this._cmdTree.MoveDown();
        if (command == undefined) {
            return undefined;
        }
        return command.ExecValues();
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

if(typeof require != 'undefined') {
    CommandHistoryTree = require('./command-tree.js');
}

class CommandManager {
    constructor() {
        this._cmdTree = new CommandTree();
    }

    Reset(){
        this._cmdTree.Clean();
    }

    Seach(key) {
        this._cmdTree.search(this._cmdTree.Root(),key);
    }

    ExecCommand(command, cmdTypes=CommandTypes.Original) {

        var fController = new FrontController();
        let game = fController.controller.game();

        let isSuccess = true; // Get return value of success or error from
        let currNode=undefined;
        if(cmdTypes == CommandTypes.Original){
           currNode = this._cmdTree.Insert(command);
        }
        else{
            currNode = this._cmdTree.Current();
        }

       let cmdVal = command.ExecValues();
       switch(command.Name()){
           case "Place":
                game.placePentomino(cmdVal.Pentomino, cmdVal.PosX,cmdVal.PosY);
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
                throw new Error("Invalid Command Found: "+command.name);
                //TODO: add commund related flag variable
                break;

       }

       if(isSuccess && (currNode != undefined)) {
            game.updateCmdKey(currNode.Key());
            /*
                console.info("Root Key: "+ this._cmdTree.RootKey());
                console.info("Current Key: "+ this._cmdTree.CurrentKey());
            */
        }

        return command;
    }

    JumpToRoot() {
        let cmdSequences = [];
        while (!this._cmdTree.isAtRoot()) {
            executedCommands.push(this.undo());
        }
        return cmdSequences;
    }

    ExecCmdSequence(cmdSequence, onUndo, onRedo) {
        if (cmdSequence.getStart() != this._cmdTree.getLastCommand()) {
            throw new Error(
                    "State Error:"+
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

/* 
   Undo() {
        if (this._cmdTree.isAtRoot()) {
            throw new Error("There exists no command to undo");
        }

        let undoCommand = this._cmdTree.getLastCommand();
        undoCommand.undo();
        this._cmdTree.moveUp();
        return undoCommand;
    }
*/

    Undo(){
        let command =  this._cmdTree.MoveUp();
        if(command == undefined){
            return undefined;
        }
        return command.ExecUndoValues();

    }

    Redo(strategy){
        let command =  this._cmdTree.MoveDown(strategy);
        if(command == undefined){
            return undefined;
        }
        return command.ExecValues();
    }

/*
    Redo(command) {
        command.execute();
        this._cmdTree.moveDown(command);
        return command;
    }
*/
    RedoCommandsAll() {
        return this._cmdTree.getLastCommand().getChildren();
    }

    CmdTree() {
        return this._cmdTree;
    }
}

if(typeof module != 'undefined') {
    module.exports = CommandManager;
}

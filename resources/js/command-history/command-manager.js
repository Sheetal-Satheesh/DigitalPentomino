// if(typeof require != 'undefined') {
//     CommandHistoryTree = require('./command-history-tree.js');
// }

class CommandManager {
    constructor() {
        this._history = new CommandHistoryTree();
    }

    jumpToBeginning() {
        let executedCommands = [];
        while (!this._history.isAtRoot()) {
            executedCommands.push(this.undo());
        }
        return executedCommands;
    }

    executeCommandPath(commandPath, onUndo, onRedo) {
        if (!(commandPath.getStart() === this._history.getLastCommand())) {
            throw new Error("State Error: Current state is not start state of commandPath");
        }

        for (let i = 0; i < commandPath.getNumOfUndoCommands(); i++) {
            onUndo(this.undo());
        }
        commandPath.getRedoCommands().forEach(command => {
            onRedo(this.redo(command));
        });
    }

    jumpToCommand(command) {
        let commandPath = this._history.getPathToCommand(command);
        let executedCommands = [];
        for (let i = 0; i < commandPath.getNumOfUndoCommands(); i++) {
            executedCommands.push(this.undo());
        }
        commandPath.getRedoCommands().forEach(command => {
            executedCommands.push(this.redo(command));
        });
        return executedCommands;
    }

    executeNewCommand(command) {
        command.execute();
        this._history.insertAndMoveDown(command);
        return command;
    }

    isUndoPossible() {
        return !(this._history.isAtRoot());
    }

    undo() {
        if (this._history.isAtRoot()) {
            throw new Error("There exists no command to undo");
        }

        let undoCommand = this._history.getLastCommand();
        undoCommand.undo();
        this._history.moveUp();
        return undoCommand;
    }

    redo(command) {
        command.execute();
        this._history.moveDown(command);
        return command;
    }

    getPossibleRedoCommands() {
        return this._history.getLastCommand().getChildren();
    }

    getHistory() {
        return this._history;
    }
}

if(typeof module != 'undefined') {
    module.exports = CommandManager;
}

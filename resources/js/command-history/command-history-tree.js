// if(typeof require != 'undefined') {
//     Command = require('./command.js');
//     CommandPath = require('./command-path.js');
// }

class CommandHistoryTree {
    constructor() {
        this._tree = new Command();
        this._lastCommand = this._tree;
    }

    moveUp() {
        this._lastCommand = this._lastCommand.getParent();
    }

    moveDown(command) {
        if (this.isEmpty()) {
            throw new Error("History is empty");
        }

        if (this.isAtLeaf()) {
            throw new Error("Current command has no children");
        }

        if (this._lastCommand.getChildren().find(c => c._id === command._id) === undefined) {
            throw new Error("Current command has no child:" + command);
        }

        this._lastCommand = command;
    }

    insertAndMoveDown(command) {
        this._lastCommand.getChildren().push(command);
        command.setParent(this._lastCommand);
        this.moveDown(command);
    }

    getLastCommand() {
        return this._lastCommand;
    }

    isEmpty() {
        return this.isAtRoot() && this.isAtLeaf();
    }

    isAtRoot() {
        return this._lastCommand === this._tree;
    }

    isAtLeaf() {
        return this._lastCommand.getChildren().length === 0;
    }

    getRoot() {
        return this._tree;
    }

    getById(commandId) {
        return this._depthFirstSearch(commandId, this.getRoot(), []);
    }

    getPathToCommand(destination) {
        if (destination === null || destination === undefined) {
            throw new Error("destination is null or undefined");
        }

        let depthFirstStart = this._lastCommand;
        let undosNecessary = 0;
        let ignoreCommands = [];

        let result = this._depthFirstSearchGetCommandPath(destination, depthFirstStart, new CommandPath(this._lastCommand), ignoreCommands);

        while (result === null) {
            ignoreCommands.push(depthFirstStart);
            depthFirstStart = depthFirstStart.getParent();
            if (depthFirstStart === null) throw new Error("No command found: " + destination);

            undosNecessary++;

            result = this._depthFirstSearchGetCommandPath(destination, depthFirstStart, new CommandPath(this._lastCommand), ignoreCommands);
        }

        result.setNumOfUndoCommands(undosNecessary);
        return result;
    }

    _depthFirstSearch(id, currentCommand, ignoreCommands) {
        if (ignoreCommands.some(c => c === currentCommand)) {
            return null;
        }

        if (currentCommand.getId() === id) {
            return currentCommand;
        }

        let foundCommand = null;
        currentCommand.getChildren().forEach(command => {
            let result = this._depthFirstSearch(id, command, ignoreCommands);
            if (!(result === null)) {
                foundCommand = command;
                return true;
            }
            return false;
        });

        return foundCommand;
    }

    _depthFirstSearchGetCommandPath(destination, currentCommand, commandPath, ignoreCommands) {
        if (ignoreCommands.some(c => c === currentCommand)) {
            return null;
        }

        if (currentCommand === destination) {
            return commandPath;
        }

        let foundPath = null;
        currentCommand.getChildren().some(command => {
            commandPath.addRedoCommand(command);
            let result = this._depthFirstSearchGetCommandPath(destination, command, commandPath, ignoreCommands);
            if (!(result === null)) {
                foundPath = result;
                return true;
            }
            commandPath.removeRedoCommand(command);
            return false;
        });

        return foundPath;
    }
}

if(typeof module != 'undefined') {
    module.exports = CommandHistoryTree;
}

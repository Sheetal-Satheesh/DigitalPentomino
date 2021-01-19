class CommandPath {
    constructor(start) {
        this._start = start;
        this._numOfUndoCommands = 0;
        this._redoCommands = [];
    }

    getStart() {
        return this._start;
    }

    addRedoCommand(command) {
        this._redoCommands.push(command);
    }

    removeRedoCommandById(commandId) {
        this._redoCommands = this._redoCommands.filter(c => !(c.getId() === commandId));
    }

    removeRedoCommand(command) {
        this._redoCommands = this._redoCommands.filter(c => !(c === command));
    }

    setNumOfUndoCommands(numOfUndoCommands) {
        this._numOfUndoCommands = numOfUndoCommands;
    }

    getNumOfUndoCommands() {
        return this._numOfUndoCommands;
    }

    getRedoCommands() {
        return this._redoCommands;
    }
}

if(typeof module != 'undefined') {
    module.exports = CommandPath;
}

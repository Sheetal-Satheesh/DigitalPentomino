if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class PlaceCommand extends Command {
    constructor(game, pentomino, row, col) {
        super("place");
        this._game = game;
        this._pentomino = pentomino;
        this._row = row;
        this._col = col;
    }

    execute() {
        this._game.placePentomino(this._pentomino, this._row, this._col);
    }

    undo() {
        this._game.removePentomino(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = PlaceCommand;
}

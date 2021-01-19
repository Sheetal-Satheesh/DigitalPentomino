if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class PlaceCommand extends Command {
    constructor(game, pentomino, x, y) {
        super();
        this._game = game;
        this._pentomino = pentomino;
        this._x = x;
        this._y = y;
    }

    execute() {
        this._game.placePentomino(this._pentomino, this._x, this._y);
    }

    undo() {
        this._game.removePentomino(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = PlaceCommand;
}

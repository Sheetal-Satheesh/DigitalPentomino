if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class RemoveCommand extends Command {
    constructor(game, pentomino, x, y) {
        super();
        this._game = game;
        this._pentomino = pentomino;
        let position = game.getPositionOfPentomino(pentomino);
        this._oldXPos = position[0];
        this._oldYPos = position[1];
    }

    execute() {
        this._game.removePentomino(this._pentomino);
    }

    undo() {
        this._game.placePentomino(this._pentomino, this._oldXPos, this._oldYPos);
    }
}

if(typeof module != 'undefined') {
    module.exports = RemoveCommand;
}

if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class MoveToPositionCommand extends Command {
    constructor(game, pentomino, x, y) {
        super();
        this._game = game;
        this._pentomino = pentomino;
        this._x = x;
        this._y = y;
        let oldPosition = this._game.getPosition(this._pentomino);
        this._oldXPos = oldPosition[0];
        this._oldYPos = oldPosition[1];
    }

    execute() {
        this._game.movePentominoToPosition(this._pentomino, this._x, this._y);
    }

    undo() {
        this._game.movePentominoToPosition(this._pentomino, this._oldXPos, this._oldYPos);
    }
}

if(typeof module != 'undefined') {
    module.exports = MoveToPositionCommand;
}

if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class MoveToPositionCommand extends Command {
    constructor(game, pentomino, row, col) {
        super("moveToPosition");
        this._game = game;
        this._pentomino = pentomino;
        this._row = row;
        this._col = col;
        let oldPosition = this._game.getPosition(this._pentomino);
        this._oldRowPos = oldPosition[0];
        this._oldColPos = oldPosition[1];
    }

    execute() {
        this._game.movePentominoToPosition(this._pentomino, this._row, this._col);
    }

    undo() {
        this._game.movePentominoToPosition(this._pentomino, this._oldRowPos, this._oldColPos);
    }
}

if(typeof module != 'undefined') {
    module.exports = MoveToPositionCommand;
}

if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class RotateClkWiseCommand extends Command {
    constructor(game, pentomino) {
        super();
        this._game = game;
        this._pentomino = pentomino;
    }

    execute() {
        this._game.rotatePentominoClkWise(this._pentomino);
    }

    undo() {
        this._game.rotatePentominoAntiClkWise(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = RotateClkWiseCommand;
}

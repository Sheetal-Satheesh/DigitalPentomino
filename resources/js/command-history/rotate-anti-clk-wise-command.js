// if(typeof require != 'undefined') {
//     Command = require('./command.js');
// }

class RotateAntiClkWiseCommand extends Command {
    constructor(game, pentomino) {
        super();
        this._game = game;
        this._pentomino = pentomino;
    }

    execute() {
        this._game.rotateAntiClkWise(this._pentomino);
    }

    undo() {
        this._game.rotateClkWise(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = RotateAntiClkWiseCommand;
}

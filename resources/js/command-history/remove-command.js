// if(typeof require != 'undefined') {
//     Command = require('./command.js');
// }

class RemoveCommand extends Command {
    constructor(game, pentomino, row, col) {
        super();
        this._game = game;
        this._pentomino = pentomino;
        let position = game.getPositionOfPentomino(pentomino);
        this._oldRowPos = position[0];
        this._oldColPos = position[1];
    }

    execute() {
        this._game.removePentomino(this._pentomino);
    }

    undo() {
        this._game.placePentomino(this._pentomino, this._oldRowPos, this._oldColPos);
    }
}

if(typeof module != 'undefined') {
    module.exports = RemoveCommand;
}

// if(typeof require != 'undefined') {
//     Command = require('./command.js');
// }

class MirrorHCommand extends Command {
    constructor(game, pentomino) {
        super();
        this._game = game;
        this._pentomino = pentomino;
    }

    execute() {
        this._game.mirrorPentominoH(this._pentomino);
    }

    undo() {
        this._game.mirrorPentominoH(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = MirrorHCommand;
}

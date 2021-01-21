if(typeof require != 'undefined') {
    Command = require('./command.js');
}

class MirrorVCommand extends Command {
    constructor(game, pentomino) {
        super();
        this._game = game;
        this._pentomino = pentomino;
    }

    execute() {
        this._game.mirrorPentominoV(this._pentomino);
    }

    undo() {
        this._game.mirrorPentominoV(this._pentomino);
    }
}

if(typeof module != 'undefined') {
    module.exports = MirrorVCommand;
}

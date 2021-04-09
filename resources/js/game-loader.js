if(typeof require != 'undefined') {
    Game = require('./game.js');
    Board = require('./board.js');
}

class GameLoader {

    constructor(){
        this._game = null;
        this._commandManager = null;
        this._hintAI = null;
        /**
         * 
         * 
         * [{
         *  name: "",
         *  game: game,
         *  img: ,
         *  key: 
         * },....]
         * 
         */
        this._gameList = [];
    }

    saveGame(){
        let cmdKey = this._game.getCmdKey();
        this._gameList.push(cmdKey);
    }

    getGames(){
        return this._gameList;
    }
    
    loadGame(game){
        
    }

    loadGameFromJson(gmconfig){

    }

    setGame(game) {
        this._game = game;
    };

    getGame(game){
        return this._game;
    }

    resetGame(){
        this._game.reset();
        this._commandManager.Reset();
        return this._game;
    }

    createGame( boardStartXY, 
                boardSizeXY, 
                Boardshape, 
                name) {
        
        boardStartXY[0] = parseInt(boardStartXY[0]);
        boardStartXY[1] = parseInt(boardStartXY[1]);

        boardSizeXY[0]=parseInt(boardSizeXY[0]);
        boardSizeXY[1]=parseInt(boardSizeXY[1]);

        this.setGame(
                    new Game(
                        new Board(
                                boardStartXY,
                                boardSizeXY,
                                Boardshape), 
                    name));

        this._game._fillUpTray();
        this._commandManager = new CommandManager();
        this._hintAI = new HintAI(this._game);
    }

    cmdManager(){
        return this._commandManager;
    }

    hintAI(){
        return this._hintAI;
    }
}

if(typeof module != 'undefined') {
    module.exports = GameLoader;
}

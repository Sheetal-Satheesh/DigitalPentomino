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
        this._gameList = {};
        this._gameImages = {};

        /**[ 
         *  gameId : {
         *              cmdManager: 
         *              commandKey: []
         *          },
         * ]
         * 
         * 
        */
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

    saveGame(){
        let cmdKey = this._game.getCmdKey();
        let gameId = this._game._id;
        if(cmdKey == undefined){
            return;
        }
        if(!this._gameList.hasOwnProperty(gameId)){            
            this._gameList[gameId]={
                    "cmdManager": this._commandManager,
                    "cmdKey": [cmdKey]
                };
        }
        else{
            this._gameList[gameId].cmdKey.push(cmdKey);
        }       

    }

    saveGameImage(image){
        let cmdKey = this._game.getCmdKey();
        if(!this._gameImages.hasOwnProperty(cmdKey)){
            this._gameImages[cmdKey] = image;
            this.saveGame();
        }
    }
    getGameImages(){
        return this._gameImages;
    }

    getGames(){
        return this._gameList;
    }
    
    loadGame(cmdKey){

        for(let gameKey in this._gameList){
            if(this._gameList.hasOwnProperty(gameKey)){
                for(let key in this._gameList[gameKey].cmdKey){
                    if(this._gameList[gameKey].cmdKey[key] == cmdKey){
                        this._commandManager = this._gameList[gameKey].cmdManager;
                        this.setGame(this._commandManager._game);
                        return;
                    }
                }
            }
        }
    
        console.error("commandKey not found");
    }

    loadGameFromJson(gmconfig){

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

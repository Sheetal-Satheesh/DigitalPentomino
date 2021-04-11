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

    saveGame(game){

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

    static loadGameState(cmdKey){
        var fController = new FrontController();
        let gmController = fController.controller;
        let currGame = gmController.game();
        let currentCmdKey = gmController.getCurrentCmdKey();
        gmController.saveGame(currGame);
        let cmdSequences = gmController.getCmdSequences(currentCmdKey, cmdKey);
        return cmdSequences;

       // cmdSequences = cmdSequences.reverse();
        
        // cmdSequences.forEach((command) => {
        //     switch(command.name){
        //         case "Place":
        //             if( (command.PosX == undefined) && 
        //                 (command.PosY == undefined)) {
        //                 gmController.removePentomino(
        //                                     command.Pentomino,
        //                                     CommandTypes.Shadow);
        //             }
        //             else{
        //                 gmController.placePentomino(
        //                             command.Pentomino,
        //                             command.PosX,
        //                             command.PosY,
        //                             CommandTypes.Shadow);
        //             }
    
        //             break;
    
        //         case "Remove":
        //             break;
                
        //         case "RotateClkWise":
        //             gmController.rotatePentominoClkWise(command.Pentomino,
        //                                                 CommandTypes.Shadow);
        //             break;
                
        //         case "RotateAntiClkWise":
        //             gmController.rotatePentominoAntiClkWise(command.Pentomino,
        //                                                     CommandTypes.Shadow);
        //             break;
                
        //         case "MirrorH":
        //             gmController.mirrorPentominoH(command.Pentomino,
        //                                          CommandTypes.Shadow);
        //             break;
                
        //         case "MirrorV":
        //             gmController.mirrorPentominoV( command.Pentomino,
        //                                            CommandTypes.Shadow);
        //             break;
                
        //         default:
        //             //TODO: add commund related flag variable
        //             throw new Error("Can not undo");
                    
        //     }
        // },this);

        return true;
    }
}

if(typeof module != 'undefined') {
    module.exports = GameLoader;
}

if (typeof require != 'undefined') {
    Game = require('./game.js');
    Board = require('./board.js');
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

class GameLoader {

    constructor() {
        this._game = null;
        this._commandManager = null;
        this._hintAI = null;
        /**
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
        this._gameImages = [];

        /**[
         *  gameId : {
         *              cmdManager: this._commandManager
         *              hintAI: this._hintAI,
         *              game: this._game,
         *              commandKey: []
         *          },
         * ]
         * 
        */
    }

    cmdManager() {
        return this._commandManager;
    }

    hintAI() {
        return this._hintAI;
    }

    getGame() {
        return this._game;
    }

    getGameImages() {
        return this._gameImages;
    }

    getGames() {
        return this._gameList;
    }


    setGame(game) {
        this._game = game;
    };

    setCmdManager(cmdManager) {
        this._commandManager = cmdManager;
    }

    setHintAI(hintAI) {
        this._hintAI = hintAI;
    }

    isGameStateSaved(game) {
        let gameId = game.getId();

        if (!this._gameList.hasOwnProperty(gameId)) {
            return false;
        }

        if (this._gameList[gameId].cmdKey.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    createGame(boardStartXY,
        boardSizeXY,
        Boardshape,
        name) {

        boardStartXY[0] = parseInt(boardStartXY[0]);
        boardStartXY[1] = parseInt(boardStartXY[1]);

        boardSizeXY[0] = parseInt(boardSizeXY[0]);
        boardSizeXY[1] = parseInt(boardSizeXY[1]);

        this.setGame(
            new Game(
                new Board(
                    boardStartXY,
                    boardSizeXY,
                    Boardshape),
                name));

        let piecesInTray = this._game.getPentominosInTray();

        if (piecesInTray.length == 0) {
            this._game._fillUpTray();
        }
        this._commandManager = new CommandManager();
        this._hintAI = new HintAI(this._game);
        this.saveGame();
    }

    resetGame() {
        if (isEmpty(this._game)) {
            console.error("game object is not initialized");
            return;
        }
        let boardSettings = this._game._board.getBoardSettings();
        let boardStartXY = boardSettings.boardStartPos;
        let boardSize = boardSettings.boardSize;
        let gameName = this._game.getName();
        let gameId = this._game.getId();

        if (!this.isGameStateSaved(this._game)) {
            delete this._gameList[gameId];
            this._game.reset();
            this._commandManager.Reset();
        }

        this.createGame(
            boardStartXY,
            boardSize,
            "Block",
            gameName);
    }

    saveGame() {
        let cmdKey = this._game.getCmdKey();
        let gameId = this._game._id;

        let gameClone = _.cloneDeep(this._game);
        let cmdManagerClone = _.cloneDeep(this._commandManager);
        let hintAIClone = _.cloneDeep(this._hintAI);

        if (!this._gameList.hasOwnProperty(gameId)) {
            this._gameList[gameId] = {
                "game": gameClone,
                "cmdManager": cmdManagerClone,
                "hintAI": hintAIClone,
                "cmdKey": [cmdKey]
            };

            this._gameList[gameId].cmdKey = this._gameList[gameId].cmdKey.filter(
                (cmdKey) => cmdKey !== undefined);
        }
        else {
            this._gameList[gameId].cmdKey.push(cmdKey);
            this._gameList[gameId].cmdManager = cmdManagerClone;
            this._gameList[gameId].hintAI = hintAIClone;
        }
    }

    deleteGame(key) {
        if (key == undefined) {
            return;
        }

        let gameIds = Object.keys(this._gameList);
        for (let id in gameIds) {
            let gmId = gameIds[id];
            this._gameList[gmId].cmdKey = this._gameList[gmId].cmdKey.filter(item => item !== key);
            if (this._gameList[gmId].cmdKey.length == 0) {
                delete this._gameList[gmId];
                break;
            }
        }
    }

    saveGameImage(image) {
        let cmdKey = this._game.getCmdKey();
        if (cmdKey == undefined) {
            return;
        }

        this.saveGame();
        this._gameImages.push({
            [cmdKey]: image
        });
    }

    deleteGameImage(key) {
        this._gameImages = this._gameImages.filter(
            (obj) => Object.keys(obj)[0] !== key);
        this.deleteGame(key);
    }

    loadGame(cmdKey) {
        for (let gameKey in this._gameList) {
            if (this._gameList.hasOwnProperty(gameKey)) {
                for (let key in this._gameList[gameKey].cmdKey) {
                    if (this._gameList[gameKey].cmdKey[key] == cmdKey) {
                        this.setCmdManager(this._gameList[gameKey].cmdManager);
                        this.setGame(this._gameList[gameKey].game);
                        this.setHintAI(this._gameList[gameKey].hintAI);
                        this.loadGameState(cmdKey);
                        return;
                    }
                }
            }
        }

        console.error("commandKey not found");
    }

    loadGameState(targetStateKey) {

        let startCmdKey;
        if (this._game.getCmdKey() == undefined) {
            startCmdKey = this._commandManager.StartCmdKey();
        }
        else {
            startCmdKey = this._commandManager.CurrentCmdKey();
        }


        let [cmdSequences, seqType] = this._commandManager.CmdSequences(startCmdKey, targetStateKey);
        let cmdLength = cmdSequences.length;
        if (seqType == 2) {
            --cmdLength;
        }

        for (let indx = 0; indx < cmdLength; indx++) {
            if (seqType == 2) {
                this._commandManager.CmdTree().MoveUp();
            }
            else {
                this._commandManager.CmdTree().MoveDown();
            }

            let command = cmdSequences[indx];
            let pentomino = command.Pentomino;
            let posX = command.PosX;
            let posY = command.PosY;

            if (posX == undefined) {
                pentomino.updateTrayValue(1);
                this._game.addToTray(pentomino);
                this._commandManager.ExecCommand(
                    new RemoveCommand(
                        pentomino,
                        this._game.getPosition(pentomino)
                    ), CommandTypes.Shadow
                );
            }
            else {

                // if (pentomino.inTray == 1) {
                this._game.removeFromTray(pentomino);
                pentomino.updateTrayValue(0);
                // }
                this._commandManager.ExecCommand(
                    new PlaceCommand(
                        pentomino,
                        this._game.getPosition(pentomino),
                        [posX, posY]
                    ), CommandTypes.Shadow);
            }
        }
    }

    static loadGadmeState(cmdKey) {
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

if (typeof module != 'undefined') {
    module.exports = GameLoader;
}

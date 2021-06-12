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
        this._gameLastImages = {};

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

    getCurrentGameKey() {
        return this._game.getId();
    }

    getGameImages() {
        return this._gameImages;
    }

    getImagesByGameId(gameId) {
        let cmdKeys = this._gameList[gameId].cmdKey;
        let localImages = [];
        cmdKeys.forEach((item) => {
            this._gameImages.forEach((gameImg) => {
                if (Object.keys(gameImg) == item) {
                    localImages.push(gameImg);
                }
            });
        }, this);

        return localImages;
    }

    getAllGameIds() {
        let gameIds = [];
        for (let gameEntry in this._gameList) {
            gameIds.push(gameEntry);
        }
        return gameIds;
    }

    getLastGameimages(gameId) {
        let gameIds = this.getAllGameIds();
        if (gameIds.find(id => id === gameId)) {
            return this._gameLastImages[gameId];
        }
        else {
            console.error("Game Id:" + gameId + "not found in gameList");
            return undefined;
        }
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

    getGameIdByKey(key) {
        for (let gameEntry in this._gameList) {
            if (this._gameList[gameEntry].cmdKey.find(cmdKey => cmdKey === key)) {
                return gameEntry;
            }
        }
        return undefined;
    }

    createGame(boardStartXY,
        boardSizeXY,
        Boardshape,
        blockedCells,
        name) {

        boardStartXY[0] = parseInt(boardStartXY[0]);
        boardStartXY[1] = parseInt(boardStartXY[1]);

        boardSizeXY[0] = parseInt(boardSizeXY[0]);
        boardSizeXY[1] = parseInt(boardSizeXY[1]);
        let prevGameName = (this._game == null) ? null : this._game.getName();

        this.setGame(
            new Game(
                new Board(
                    boardStartXY,
                    boardSizeXY,
                    blockedCells,
                    Boardshape),
                name));

        let piecesInTray = this._game.getPentominosInTray();

        if (piecesInTray.length == 0) {
            this._game._fillUpTray();
        }
        this._commandManager = new CommandManager();

        if (prevGameName == null || prevGameName != this._game.getName()) {
            this._hintAI = new HintAI(this._game, true);
        }
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
        let blockCells = boardSettings.blockCells;
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
            blockCells,
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

            return true;
        }
        else {
            if (this._gameList[gameId].cmdKey.find(key => key == cmdKey)) {
                return false;
            }
            this._gameList[gameId].cmdKey.push(cmdKey);
            this._gameList[gameId].cmdManager = cmdManagerClone;
            this._gameList[gameId].hintAI = hintAIClone;

            return true;
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
                delete this._gameLastImages[gmId];
                break;
            }
        }
    }

    saveGameImage(image) {
        let cmdKey = this._game.getCmdKey();
        if (cmdKey == undefined) {
            return;
        }
        let currGameId = this._game.getId();
        const imgType = image.getAttribute('type');
        if (imgType === "copy") {
            this._gameLastImages[currGameId] = image;
            return;
        }

        let verdict = this.saveGame();
        if (verdict == false) {
            return;
        }
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

    jumpToGameState(cmdSequences, seqType) {

        let cmdProperty = updateCommandAttr(CommandTypes.Shadow, seqType);
        let cmdSeqLength = cmdSequences.length;
        if (seqType == CommandSeq.Backward) {
            --cmdSeqLength;
        }

        for (let indx = 0; indx < cmdSeqLength; indx++) {

            let command = cmdSequences[indx];
            let pentomino = command.Pentomino;
            let posX = command.PosX;
            let posY = command.PosY;

            switch (command.name) {
                case "Remove":
                case "Place":
                    if ((command.PosX == undefined) &&
                        (command.PosY == undefined)) {
                        pentomino.updateTrayValue(1);
                        this._game.addToTray(pentomino);
                        this._commandManager.ExecCommand(
                            new RemoveCommand(
                                pentomino,
                                this._game.getPosition(pentomino)
                            ), cmdProperty
                        );
                    }
                    else {
                        if (this._game.isPentominiInTray(pentomino)) {
                            this._game.removeFromTray(pentomino);
                            pentomino.updateTrayValue(0);
                        }
                        this._commandManager.ExecCommand(
                            new PlaceCommand(
                                pentomino,
                                this._game.getPosition(pentomino),
                                [posX, posY]
                            ), cmdProperty);
                    }

                    break;

                case "RotateClkWise":
                    this._commandManager.ExecCommand(
                        new RotateClkWiseCommand(pentomino),
                        cmdProperty);
                    break;

                case "RotateAntiClkWise":
                    this._commandManager.ExecCommand(
                        new RotateAntiClkWiseCommand(pentomino),
                        cmdProperty);
                    break;

                case "MirrorH":
                    this._commandManager.ExecCommand(
                        new MirrorHCommand(pentomino),
                        cmdProperty);
                    break;

                case "MirrorV":
                    this._commandManager.ExecCommand(
                        new MirrorVCommand(pentomino),
                        cmdProperty);
                    break;

                default:
                    //TODO: add commund related flag variable
                    throw new Error("Can not undo");
            }
        }
    }

    loadGameState(targetStateKey) {

        let currCmddKey = this._commandManager.CurrentCmdKey();
        if (this._game.getCmdKey() == undefined) {
            let startCmdKey = this._commandManager.StartCmdKey();
            let [cmdSequences, seqType] = this._commandManager.CmdSequences(startCmdKey, currCmddKey);
            this.jumpToGameState(cmdSequences, seqType);
        }

        currCmddKey = this._commandManager.CurrentCmdKey();
        let [cmdSequences, seqType] = this._commandManager.CmdSequences(currCmddKey, targetStateKey);
        this.jumpToGameState(cmdSequences, seqType);

    }

}

if (typeof module != 'undefined') {
    module.exports = GameLoader;
}

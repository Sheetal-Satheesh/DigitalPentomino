if (typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    Config = require('./config.js');
}


class PD {

    constructor() {
        /**
         * Front-end interface always call FrontController instead of GameController.
         */
        var fController = new FrontController();
        this.gameController = fController.controller;
        this.loadBoard("board_6x10");
    }

    rotateClkWise() {
        this.visual.rotateClkWise();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    rotateAntiClkWise() {
        this.visual.rotateAntiClkWise();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    flipH() {
        this.visual.flipH();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    flipV() {
        this.visual.flipV();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    reset() {
        this.visual.reset();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    /**
    * Returns all boards with configurations and solutions
    */
    getAllBoards() {
        let boardsWithConfig = [];
        if (baseConfigs != undefined && solutionsConfig != undefined) {
            if (baseConfigs.hasOwnProperty("boards")) {
                baseConfigs.boards.forEach(board => {
                    if (solutionsConfig.hasOwnProperty(board)) {
                        boardsWithConfig.push(board);
                    }
                });
            } else {
                throw new Error("Error in configuration: Could not find any boards");
            }
        } else {
            throw new Error("Error in configuration: Could not find basic game configurations");
        }
        return boardsWithConfig;
    }

    loadBoard(board, loadType) {
        let gameObject = UtilitiesClass.getGameUISettings(board);
        this.boardName = board; // HACK: To be changed later. This needs to be obtained from the backend. 
        this.boardSize = gameObject.boardSize;
        this.boardShape = gameObject.boardShape;
        this.gameHeight = gameObject.gameHeight;
        this.gameWidth = gameObject.gameWidth;
        this.blockedCells = gameObject.blockedCells;
        this.gameCellPattern = gameObject.gameCellPattern;

        this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
        this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);

        [this.boardStartX, this.boardStartY] = UtilitiesClass.getBoardStartCoords(board);

        if (loadType == "Snapshot") {
            this.visual.reload(pd);
        }
        else {
            this.gameController.createGame(
                [this.boardStartX, this.boardStartY],
                this.boardSize,
                this.boardShape,
                this.blockedCells,
                board);
            this.visual = new Visual(this);
            if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
                this.visual.showNumberOfPossibleSolutions();
            }
        }




    }

    hints() {
        return this.gameController.getHint();
    }

    callHintAI() {
        this.visual.callHintAI();
    }

    callSplitBoard() {
        this.visual.callSplitBoard();
    }

    prefillBoard() {
        this.visual.prefillBoard();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    undo() {
        this.visual.undo();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    redo() {
        this.visual.redo();
        if (SettingsSingleton.getInstance().getSettings().hinting.showNumberOfPossibleSolutions) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    replay(startState, targetState) {
        this.visual.replay(startState, targetState);
    }

    getGameState(type) {
        return this.visual.getCmdState(type);
    }

    getAllGameStates() {
        return this.visual.getGameStates();
    }

}


// this.ui.load();

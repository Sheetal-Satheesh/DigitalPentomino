class PD {

    constructor() {
        /**
         * Front-end interface always call FrontController instead of GameController.
         */
        this.gameWidth = baseConfig.gameWidth;
        this.gameHeight = baseConfig.gameHeight;
        var fController = new FrontController();
        this.gameController = fController.controller;
        this.loadBoard("board_8x8a");

        this.visual = new Visual(this);
        this.reset();
    }

    rotateClkWise(){
        this.visual.rotateClkWise();
        this.visual.showNumberOfPossibleSolutions();
    }

    rotateAntiClkWise() {
        this.visual.rotateAntiClkWise();
        this.visual.showNumberOfPossibleSolutions();
    }

    flipH(){
        this.visual.flipH();
        this.visual.showNumberOfPossibleSolutions();
    }

    flipV(){
        this.visual.flipV();
        this.visual.showNumberOfPossibleSolutions();
    }

    reset(){
       this.gameController.resetGame();
       this.visual.clear();
       this.visual.showNumberOfPossibleSolutions();
    }

    loadBoard(board){
        boardCfg.board = board;
        this.boardSize = baseConfig[boardCfg.board].boardSize;
        this.boardShape = baseConfig[boardCfg.board].boardShape;
        this.blockCells = (baseConfig[boardCfg.board].hasOwnProperty('blockedCells'))?
                                        baseConfig[boardCfg.board].blockedCells:undefined;

        this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
        this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);
        this.gameController.createGame(
                                    [this.boardStartX, this.boardStartY],
                                    this.boardSize,
                                    this.boardShape);

        this.visual = new Visual(this);
        this.visual.showNumberOfPossibleSolutions();
    }

    hints(){
       return this.gameController.getHint();
    }

     callHintAI(){
        this.visual.callHintAI();
    }
}



// this.ui.load();
// document.getElementById("btnBoardSelect").onclick = () => { this.loadBoard('board_6x10'); }; -->
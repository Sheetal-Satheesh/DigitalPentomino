class PD {

    constructor() {
        this.gameWidth = baseConfig.gameWidth;
        this.gameHeight = baseConfig.gameHeight;
        this.gameController = new GameController();
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
}



// this.ui.load();
// document.getElementById("btnBoardSelect").onclick = () => { this.loadBoard('board_6x10'); }; -->
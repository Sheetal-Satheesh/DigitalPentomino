class PD {

    constructor() {
        this.gameController = new GameController();
        this.loadBoard("board_8x8a");

        this.visual = new Visual(this);
        this.reset();
    }

    rotateClkWise(){
        this.visual.rotateClkWise();
    }

    rotateAntiClkWise() {
        this.visual.rotateAntiClkWise();
    }

    flipH(){
        this.visual.flipH();
    }

    flipV(){
        this.visual.flipV();
    }

    reset(){
       this.gameController.resetGame();
       this.visual.clear();
    }

    loadBoard(board){
        let gameObject = GameLoader.getGameObject(board);
        this.boardSize = gameObject.boardSize;
        this.boardShape = gameObject.boardShape;
        this.gameHeight = gameObject.gameHeight;
        this.gameWidth = gameObject.gameWidth;
        this.blockedCells = gameObject.blockedCells;

        this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
        this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);
        this.gameController.createGame(
                                    [this.boardStartX, this.boardStartY],
                                    this.boardSize,
                                    this.boardShape);

        this.visual = new Visual(this);
    }

    hints(){
       return this.gameController.getHint();
    }
}



// this.ui.load();
// document.getElementById("btnBoardSelect").onclick = () => { this.loadBoard('board_6x10'); }; -->
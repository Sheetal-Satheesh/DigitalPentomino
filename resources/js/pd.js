class PD {

    constructor() {
        // this.ui = new UI(this);
        this.gameWidth	= baseConfig[selectedConfig.configName].gameWidth;
        this.gameHeight = baseConfig[selectedConfig.configName].gameHeight;
		this.boardSize	= baseConfig[selectedConfig.configName].boardSize;
		this.boardShape = baseConfig[selectedConfig.configName].boardShape;

        this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
        this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);


        /**
         * This board start position can be changed after resizing the browser window?
         *
         * Why need set Board Start Postion
         *      Backend current implementation considers that board start from
         *      (x,y)=(0,0) position. Backend pentomino position checking in or out of the board, barely
         *      depend on the board size (boardX,boardY); Which is independednt of any screen
         *      co-ordinates. somehow, We need  to know that, actual block that the
         *      board belongs, Becase we are getting the screen position co-ordinates
         *      when a pentomino placed in game (Field or board ) area. We need relative
         *      position of the board, that pentomino position and board position follow
         *      the same co-ordinates system.
         */

        this.gameController = new GameController();
        this.gameController.createGame(
                                    [this.boardStartX, this.boardStartY],
                                   this.boardSize,
                                    this.boardShape);

        this.visual = new Visual(this);

        // Attach event handlers and provide correct "this" reference inside
        let _this = this;
        document.getElementById("btnRotateRight").onclick = () => { _this.visual.rotateClkWise(); };
        document.getElementById("btnRotateLeft").onclick = () => { _this.visual.rotateAntiClkWise(); };
        document.getElementById("btnFlipH").onclick = () => { _this.visual.flipH(); };
        document.getElementById("btnFlipV").onclick = () => { _this.visual.flipV(); };
        //Refresh button on the browser which loads the saved game state with configuration
        // this.ui.load();
        this.reset();
        document.getElementById("btnBoardSelect").onclick = () => { this.loadBoard('board_6x10'); };
    }
    
    loadBoard(boardName){

    selectedConfig.configName = boardName;
    console.log('loadBoard',selectedConfig.configName);

    this.gameWidth    = baseConfig[selectedConfig.configName].gameWidth;
    this.gameHeight = baseConfig[selectedConfig.configName].gameHeight;
    this.boardSize    = baseConfig[selectedConfig.configName].boardSize;
    this.boardShape = baseConfig[selectedConfig.configName].boardShape;



    this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
    this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);
    this.gameController.createGame(
                                [this.boardStartX, this.boardStartY],
                                this.boardSize,
                                this.boardShape);



    this.visual = new Visual(this);
}


    reset(){
       this.gameController.resetGame();
       this.visual.clear();
    }


}

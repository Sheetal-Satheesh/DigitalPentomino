class PD {

    constructor() {
        // this.ui = new UI(this);
        this.gameWidth = 25;
        this.gameHeight = 12;
        this.gameController = new GameController();
        this.gameController.createGame(config.boardSize[0],config.boardSize[1],config.boardShape);
        this.visual = new Visual(this);
        
        // Attach event handlers and provide correct "this" reference inside
        let _this = this;
        document.getElementById("btnRotateRight").onclick = () => { _this.visual.rotateClkWise(); };
        document.getElementById("btnRotateLeft").onclick = () => { _this.visual.rotateAntiClkWise(); };
        document.getElementById("btnFlipH").onclick = () => { _this.visual.flipH(); };
        document.getElementById("btnFlipV").onclick = () => { _this.visual.flipV(); };
        //Refresh button on the browser which loads the saved game state with configuration
        // this.ui.load();
    }

}
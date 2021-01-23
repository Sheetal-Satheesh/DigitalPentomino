class PD {

    constructor() {
        // this.ui = new UI(this);
        this.gameWidth = 25;
        this.gameHeight = 12;
        this.gameController = new GameController();
        this.gameController.setGame(GameLoader.loadByName("Level 2"));
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
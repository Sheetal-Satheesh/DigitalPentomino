class PD {

    constructor() {
        // this.ui = new UI(this);
        this.gameWidth = 25;
        this.gameHeight = 12;
        this.gameController = new GameController();
        this.gameController.setGame(GameLoader.loadByName("Level 2"));
        this.visual = new Visual(this);
        //Refresh button on the browser which loads the saved game state with configuration
        // this.ui.load();
    }

}
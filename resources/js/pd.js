if(typeof require != 'undefined') {
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
        this.loadGame("board_6x10");
        
    }

    rotateClkWise(){
        this.visual.rotateClkWise();
        if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    rotateAntiClkWise() {
        this.visual.rotateAntiClkWise();
        if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    flipH(){
        this.visual.flipH();
        if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    flipV(){
        this.visual.flipV();
        if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    reset(){
       this.visual.clear();
       if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
           this.visual.showNumberOfPossibleSolutions();
       }
    }

        /**
     * Returns a game object of the selected/default game that can be used to draw the board
     */
    getGameUISettings(board){
        return {
                gameHeight: boardConfigs[board].gameHeight || baseConfigs.gameHeight,
                gameWidth: boardConfigs[board].gameWidth || baseConfigs.gameWidth,
                boardSize: boardConfigs[board].boardSize,
                blockedCells: boardConfigs[board].blockedCells || undefined,
                boardShape: boardConfigs[board].boardShape || baseConfigs.boardShape
        };
    }

     /**
     * Returns all boards with configurations and solutions
     */
      getAllBoards(){
        let boardsWithConfig = [];
        if(baseConfigs != undefined && boardConfigs != undefined){
            if(baseConfigs.hasOwnProperty("boards")){
                baseConfigs.boards.forEach(board => {
                    if(boardConfigs.hasOwnProperty(board)){
                        boardsWithConfig.push(board);
                    }
                });
            }else{
                throw new Error("Error in configuration: Could not find any boards");    
            }
        } else{
            throw new Error("Error in configuration: Could not find basic game configurations");
        }
        return boardsWithConfig;
    }

    loadGame(board, type){
        let gameObject = this.getGameUISettings(board);
        this.boardName = board; // HACK: To be changed later. This needs to be obtained from the backend. 
        this.boardSize = gameObject.boardSize;
        this.boardShape = gameObject.boardShape;
        this.gameHeight = gameObject.gameHeight;
        this.gameWidth = gameObject.gameWidth;
        this.blockedCells = gameObject.blockedCells;

        this.boardStartX = Math.floor((this.gameHeight - this.boardSize[0]) / 2);
        this.boardStartY = Math.floor((this.gameWidth - this.boardSize[1]) / 2);

        if(type != "Load"){
            this.gameController.createGame(
                [this.boardStartX, this.boardStartY],
                this.boardSize,
                this.boardShape,
                board);

        }

        this.visual = new Visual(this);
        if (SettingsSingleton.getInstance().getSettings().hinting.enableHinting) {
            this.visual.showNumberOfPossibleSolutions();
        }
    }

    hints(){
       return this.gameController.getHint();
    }

     callHintAI(){
        this.visual.callHintAI();
    }

    prefillBoard(){
        this.visual.prefillBoard();
    }
    
    undo(){
        this.visual.undo();
    }

    redo(){
        this.visual.redo();
    }

}



// this.ui.load();
// document.getElementById("btnBoardSelect").onclick = () => { this.loadBoard('board_6x10'); }; -->
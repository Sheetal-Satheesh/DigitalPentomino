
if(typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    CommandPath = require('./command-history/command-path.js');
    CommandManager = require('./command-history/command-manager.js');
    HintAI = require('./hint-ai.js');
}

/**
 * This is a singleton object for game controller. If front-end call gameController
 * two times, then there will two game state, which is unexpected at all. We need
 * one instance of gameController for a running game.
 *
 * UseCases: Front-end function more often event based trigger. We can not pass
 * controller object in event based function trigger. In this case, this class can 
 * be called multiple times, but always result same instance of gameController. VOLLA :)
 *
 */

var FrontController = (function() {
    var instance;
    function getController() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.controller = new GameController();
    }
    getController.getInstance = function () {
        return instance || new getController();
    }
    return getController;
}());


class GameController {
    constructor() {
        this._game = null;
        this._commandManager = null;
        this._hintAI = null;
    }

    game(){
        return this._game;
    }

    exceptionHandler(pentomino){
        if (this._game === null) {
            throw new Error("Game is not set");
        }
       
        if ( (pentomino === null) || 
             (pentomino === undefined)) {
                
            throw new Error("Type Error: Pentomino is null or undefined");
        }
        
        if(!this._isOfTypePentomino(pentomino)) {
            throw new Error(
                "Type Error: Pentomino isn't an instance of the Pentomino class.");
        }
    }

    placePentomino(
            pentomino,
            row,
            col,
            cmdType = CommandTypes.Original) {
        
        row=parseInt(row);
        col=parseInt(col);
        this.exceptionHandler(pentomino);

        return this._commandManager.ExecCommand(
                                new PlaceCommand(pentomino, 
                                        this._game.getPosition(pentomino), 
                                        [row,col]), 
                                cmdType);
    }

    movePentominoToPosition(
            pentomino, 
            row, 
            col,
            cmdType = CommandTypes.Original) {

        row=parseInt(row);
        col=parseInt(col);
        this.exceptionHandler(pentomino); // TODO: Exception need to be handled properly       
        
        return this._commandManager.ExecCommand(
                                new MoveToPositionCommand(pentomino, row, col),
                                cmdType);
    }

    rotatePentominoAntiClkWise(
            pentomino,
            cmdType = CommandTypes.Original) {

        this.exceptionHandler(pentomino);

        return this._commandManager.ExecCommand(
                                    new RotateAntiClkWiseCommand(pentomino),
                                    cmdType);
    }

    rotatePentominoClkWise(
            pentomino, 
            cmdType = CommandTypes.Original) {
        
        this.exceptionHandler(pentomino);
        
        return this._commandManager.ExecCommand(
                                    new RotateClkWiseCommand(pentomino),
                                    cmdType);
    }

    mirrorPentominoH(
            pentomino, 
            cmdType = CommandTypes.Original) {
        
        this.exceptionHandler(pentomino);
        
        return this._commandManager.ExecCommand(
                                    new MirrorHCommand(pentomino),
                                    cmdType);
    }

    mirrorPentominoV(
            pentomino, 
            cmdType = CommandTypes.Original) {
        
        this.exceptionHandler(pentomino);
        
        return this._commandManager.ExecCommand(
                                    new MirrorVCommand(pentomino),
                                    cmdType);
    }

    removePentomino(
            pentomino, 
            cmdType = CommandTypes.Original) {
        
        this.exceptionHandler(pentomino);
        
        return this._commandManager.ExecCommand(
                                    new RemoveCommand(pentomino,
                                        this._game.getPosition(pentomino)
                                    ), cmdType);
    }

    // --- --- --- Hints --- --- ---
    getHint() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        if (this._hintAI === null) {
            throw new Error("Forgot to load solutions of current game (call gameController.loadSolutionsOfCurrentGame() before)");
        }

        return this._hintAI.getHint();
    }

    loadSolutionsOfCurrentGame() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        if (this._hintAI === null) {
            this._hintAI = new HintAI();
        }

        this._hintAI.loadSolutions(this._game);
    }

    // --- --- --- History --- --- ---
    jumpToCommand(command) {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._game._commandManager.jumpToCommand(command);
    }

    jumpToBeginning() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._game._commandManager.jumpToBeginning();
    }

    executeCommandPath(commandPath, onUndo, onRedo) {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        if ( (commandPath === null) || 
             (commandPath === undefined)){
                throw new Error("Reference error: commandPath is null or undefined");
            } 

        this._game._commandManager.executeCommandPath(
                                                commandPath, 
                                                onUndo, 
                                                onRedo);
    }

    getHistory() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._game._commandManager.getHistory();
    }

    undo() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._commandManager.Undo();
    }

    redo(strategy = RedoStrategy.TOP) {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._commandManager.Redo(strategy);
    }

    isUndoPossible() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._game.isUndoPossible();
    }

   

    getPossibleRedoCommands() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }

        return this._game.getPossibleRedoCommands();
    }

    // --- --- --- Set Game --- --- ---
    setGame(game) {
        this._game = game;
    };

    resetGame(){
        this._game.reset();
        this._commandManager.Reset();
        return this._game;
    }

    createGame( boardStartXY, 
                boardSizeXY, 
                Boardshape, 
                name) {
        
        boardStartXY[0] = parseInt(boardStartXY[0]);
        boardStartXY[1] = parseInt(boardStartXY[1]);

        boardSizeXY[0]=parseInt(boardSizeXY[0]);
        boardSizeXY[1]=parseInt(boardSizeXY[1]);

        this.setGame(
                    new Game(
                        new Board(
                                boardStartXY,
                                boardSizeXY,
                                Boardshape), 
                    name));

        this._game._fillUpTray();
        this._commandManager = new CommandManager();
    }

    // --- --- --- Debugging --- --- ---
    display() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        this._game.display();
    }

    writeToDocument() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        this._game.writeToDocument();
    }

    // --- --- --- Get Information About Whether Piece Outside/Inside Board --- --- ---
    isPlacedOutsideBoard(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.isPlacedOutsideBoard(pentomino);
    }

    isPlacedOnBoard(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.isPlacedOnBoard(pentomino);
    }

    isPlacedInGame(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.isPlacedInGame(pentomino);
    }

    // --- --- --- Get Information About Collisions --- --- ---
    /**
     * Returns an array of the colliding pentominoes of a specified pentomino
     * @param pentomino
     * @returns {*}
     */
    getCollisionOfPentominoes(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.getCollisionOfPentominoes(pentomino);
    }

    /**
     * Returns the colliding cells of a specific pentomino piece
     * @param pentomino
     * @returns {*}
     */
    getCollisionCellsOfPentomino(pentomino) {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        return this._game.getCollisionCellsOfPentomino(pentomino);
    }

    /**
     * Returns an array list of all colliding cells on the board
     * @returns {*}
     */
    getCollisionCells(){
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        return this._game.getCollisionCells();
    }

    // --- --- --- Get Information About The Game For Loading --- --- ---
    getBoardSize() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        return this._game.getBoardSize();
    }

    getPentominoes() {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        return this._game.getPentominoes();
    }

    getPositionOfPentomino(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.getPosition(pentomino);
    }

    // --- --- --- Get Information About The Game For User Interaction --- --- ---
    getPentominoesAtPosition(row, col) {
        if (this._game === null) {
            throw new Error("Game is not set");
        }
        return this._game.getPentominoesAtPosition(row, col);
    }

    // --- --- --- Helper --- --- ---
    _isOfTypePentomino(pentomino) {
        return JSON.stringify(
                        Object.getPrototypeOf(pentomino)) === JSON.stringify(Pentomino.prototype);
    }

    _isOfTypeCommandPath(commandPath) {
        return JSON.stringify(
                        Object.getPrototypeOf(commandPath)) === JSON.stringify(CommandPath.prototype);
    }
}


function debug_mode(boardStartXY, boardSizeXY){
    let gc = new GameController();
    let game = new GameLoader('Level 2');
    game.display();
}


if(typeof module != 'undefined') {
    module.exports = GameController;
}

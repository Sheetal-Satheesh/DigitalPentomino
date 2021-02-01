if(typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    CommandPath = require('./command-history/command-path.js');
    HintAI = require('./hint-ai.js');
}

class GameController {
    constructor() {
        this._game = null;
        this._hintAI = new HintAI();
    }

    exceptionHandler(pentomino){
        if (this._game === null) 
            throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) 
            throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) 
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
    }

    placePentomino(pentomino,row,col) {
        row=parseInt(row);
        col=parseInt(col);
        this.exceptionHandler(pentomino);        
        return this._game.doCommandAndAddToHistory(new PlaceCommand(this._game, pentomino, row, col));
    }

    movePentominoToPosition(pentomino, row, col) {
        row=parseInt(row);
        col=parseInt(col);
        this.exceptionHandler(pentomino); // TODO: Exception need to be handled properly       
        return this._game.doCommandAndAddToHistory(new MoveToPositionCommand(this._game, pentomino, row, col));
    }

    rotatePentominoAntiClkWise(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.doCommandAndAddToHistory(new RotateAntiClkWiseCommand(this._game, pentomino));
    }

    rotatePentominoClkWise(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.doCommandAndAddToHistory(new RotateClkWiseCommand(this._game, pentomino));
    }

    mirrorPentominoH(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.doCommandAndAddToHistory(new MirrorHCommand(this._game, pentomino));
    }

    mirrorPentominoV(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.doCommandAndAddToHistory(new MirrorVCommand(this._game, pentomino));
    }

    removePentomino(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.doCommandAndAddToHistory(new RemoveCommand(this._game, pentomino));
    }

    // --- --- --- Hints --- --- ---
    getHint()
    {
        if (this._game === null) throw new Error("Game is not set");
        return this._hintAI.getHint(this._game);
    }

    // --- --- --- History --- --- ---
    jumpToCommand(command) {
        if (this._game === null) throw new Error("Game is not set");
        return this._game._commandManager.jumpToCommand(command);
    }

    jumpToBeginning() {
        if (this._game === null) throw new Error("Game is not set");
        return this._game._commandManager.jumpToBeginning();
    }

    executeCommandPath(commandPath, onUndo, onRedo) {
        if (this._game === null) throw new Error("Game is not set");
        if (commandPath === null || commandPath === undefined) throw new Error("Reference error: commandPath is null or undefined");

        this._game._commandManager.executeCommandPath(commandPath, onUndo, onRedo);
    }

    getHistory() {
        if (this._game === null) throw new Error("Game is not set");

        return this._game._commandManager.getHistory();
    }

    undo() {
        if (this._game === null) throw new Error("Game is not set");

        return this._game.undo();
    }

    isUndoPossible() {
        if (this._game === null) throw new Error("Game is not set");

        return this._game.isUndoPossible();
    }

    redo(command) {
        if (this._game === null) throw new Error("Game is not set");

        return this._game.redo(command);
    }

    getPossibleRedoCommands() {
        if (this._game === null) throw new Error("Game is not set");

        return this._game.getPossibleRedoCommands();
    }

    // --- --- --- Set Game --- --- ---
    setGame(game) {
        this._game = game;
    };

    resetGame(){
        this._game.reset();
        return this._game;
    }

    createGame(boardStartXY, boardSizeXY, Boardshape) {
        boardStartXY[0] = parseInt(boardStartXY[0]);
        boardStartXY[1] = parseInt(boardStartXY[1]);

        boardSizeXY[0]=parseInt(boardSizeXY[0]);
        boardSizeXY[1]=parseInt(boardSizeXY[1]);

        this.setGame(new Game(new Board(boardStartXY,boardSizeXY,Boardshape)));
        this._game._fillUpTray();
    }

    // --- --- --- Debugging --- --- ---
    display() {
        if (this._game === null) throw new Error("Game is not set");
        this._game.display();
    }

    writeToDocument() {
        if (this._game === null) throw new Error("Game is not set");
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
    getCollisionPentominoesOfPentomino(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.getCollisionPentominoesOfPentomino(pentomino);
    }

    /**
     * Returns the colliding cells of a specific pentomino piece
     * @param pentomino
     * @returns {*}
     */
    getCollisionCellsOfPentomino(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        return this._game.getCollisionCellsOfPentomino(pentomino);
    }

    /**
     * Returns an array list of all colliding cells on the board
     * @returns {*}
     */
    getCollisionCells(){
        if (this._game === null) throw new Error("Game is not set");
        return this._game.getCollisionCells();
    }

    // --- --- --- Get Information About The Game For Loading --- --- ---
    getBoardSize() {
        if (this._game === null) throw new Error("Game is not set");
        return this._game.getBoardSize();
    }

    getPentominoes() {
        if (this._game === null) throw new Error("Game is not set");
        return this._game.getPentominoes();
    }

    getPositionOfPentomino(pentomino) {
        this.exceptionHandler(pentomino);
        return this._game.getPosition(pentomino);
    }

    // --- --- --- Get Information About The Game For User Interaction --- --- ---
    getPentominoesAtPosition(row, col) {
        if (this._game === null) throw new Error("Game is not set");
        return this._game.getPentominoesAtPosition(row, col);
    }

    // --- --- --- Helper --- --- ---
    _isOfTypePentomino(pentomino) {
        return JSON.stringify(Object.getPrototypeOf(pentomino)) === JSON.stringify(Pentomino.prototype);
    }

    _isOfTypeCommandPath(commandPath) {
        return JSON.stringify(Object.getPrototypeOf(commandPath)) === JSON.stringify(CommandPath.prototype);
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

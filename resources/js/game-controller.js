if(typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    CommandPath = require('./command-history/command-path.js');
}

class GameController {
    constructor() {
        this._game = null;
    }

    // --- --- --- Pentomino Operations --- --- ---
    placePentomino(pentomino,row,col) {
        row=parseInt(row);
        col=parseInt(col);

        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
        this._game.placePentomino(pentomino,row,col);
        return this._game.doCommandAndAddToHistory(new PlaceCommand(this._game, pentomino, row, col));
    }

    movePentominoToPosition(pentomino, row, col) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new MoveToPositionCommand(this._game, pentomino, row, col));
    }

    rotatePentominoAntiClkWise(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new RotateAntiClkWiseCommand(this._game, pentomino));
    }

    rotatePentominoClkWise(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new RotateClkWiseCommand(this._game, pentomino));
    }

    mirrorPentominoH(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new MirrorHCommand(this._game, pentomino));
    }

    mirrorPentominoV(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new MirrorVCommand(this._game, pentomino));
    }

    removePentomino(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._game.doCommandAndAddToHistory(new RemoveCommand(this._game, pentomino));
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

    createGame(boardX, boardY, shape) {
        boardX=parseInt(boardX);
        boardY=parseInt(boardY);
        this.setGame(new Game(new Board(boardX,boardY,shape)));
        this._game._fillUpTray();
    }

    setBoardStartPostion(posX, posY){
        this._game._board.setStartPosition(posX, posY);
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
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
        return this._game.isPlacedOutsideBoard(pentomino);
    }

    isPlacedOnBoard(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
        return this._game.isPlacedOnBoard(pentomino);
    }

    isPlacedInGame(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
        return this._game.isPlacedInGame(pentomino);
    }

    // --- --- --- Get Information About Collisions --- --- ---
    /**
     * Returns an array of the colliding pentominoes of a specified pentomino
     * @param pentomino
     * @returns {*}
     */
    getCollisionPentominoesOfPentomino(pentomino) {
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");
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
        if (this._game === null) throw new Error("Game is not set");
        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!this._isOfTypePentomino(pentomino)) throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

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

if(typeof module != 'undefined') {
    module.exports = GameController;
}

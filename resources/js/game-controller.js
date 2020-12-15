function GameController() {
    this._board = null;
}

// --- --- --- Pentomino Operations --- --- ---
GameController.prototype.movePentominoToPosition = function (pentomino, x, y) {
    return this._board.placePentomino(pentomino, x, y);
}

GameController.prototype.rotatePentominoAntiClkWise = function (pentomino) {
    return this._board.rotatePentominoAntiClkWise(pentomino);
}

GameController.prototype.rotatePentominoClkWise = function (pentomino) {
    return this._board.rotatePentominoClkWise(pentomino);
}

GameController.prototype.mirrorPentominoH = function (pentomino) {
    return this._board.mirrorPentominoH(pentomino);
}

GameController.prototype.mirrorPentominoV = function (pentomino) {
    return this._board.mirrorPentominoV(pentomino);
}

// --- --- --- Set Game --- --- ---
GameController.prototype.setGame = function (board) {
    this._board = board;
}

// --- --- --- Debugging --- --- ---
GameController.prototype.display = function () {
    this._board.display();
}

GameController.prototype.writeToDocument = function () {
    this._board.writeToDocument();
}

// --- --- --- Get Information About The Game For Loading --- --- ---
GameController.prototype.getBoardSize = function () {
    if (this._board === null) throw new Error("Game is not set");
    return this._board.size;
}

GameController.prototype.getPentominos = function () {
    if (this._board === null) throw new Error("Game is not set");
    return this._board.getPentominos();
}

GameController.prototype.getPositionOfPentomino = function (pentomino) {
    if (this._board === null) throw new Error("Game is not set");
    return this._board.getPosition(pentomino);
}

// --- --- --- Get Information About The Game For User Interaction --- --- ---
GameController.prototype.getPentominoAtPosition = function (x, y) {
    if (this._board === null) throw new Error("Game is not set");
    return this._board.getPentominoAtPosition(x, y);
}

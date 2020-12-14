function GameController() {
    this._board = null;
}

// --- --- --- Operations on the pentomino ( Rotating and Mirroring) --- --- ---
GameController.prototype.setPentomino = function (pentomino, x, y) {
    let success = this._board.placePentomino(pentomino, x, y);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
}

GameController.prototype.rotateAntiClkWise = function (pentomino) {
     pentomino.rotateAntiClkWise();
}

GameController.prototype.rotateClkWise = function (pentomino) {
     pentomino.rotateClkWise();
}

GameController.prototype.mirrorH = function (pentomino) {
     pentomino.mirrorH();
}

GameController.prototype.mirrorV = function (pentomino) {
     pentomino.mirrorV();
}


// --- --- --- Set Game --- --- ---
GameController.prototype.setGame = function (board) {
    this._board = board;
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

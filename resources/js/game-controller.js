function GameController() {
    this._board = null;
}

// --- --- --- Operations on the pentamino ( Rotating and Mirroring)--- --- ---


GameController.prototype.rotateAntiClkWise = function (pentamino) {
     pentomino.rotateAntiClkWise();
}

GameController.prototype.rotateClkWise = function (pentamino) {
     pentomino.rotateClkWise();
}

GameController.prototype.mirrorH = function (pentamino) {
     pentomino.mirrorH();
}

GameController.prototype.mirrorV = function (pentamino) {
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

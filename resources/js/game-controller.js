function GameController() {
    this._board = null;
}

// --- --- --- Pentomino Operations --- --- ---
GameController.prototype.placePentomino = function (pentomino, x, y) {
    let success = this._board.placePentomino(pentomino, x, y);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
}

GameController.prototype.rotatePentominoAntiClkWise = function (pentomino) {
    let success = this._board.rotatePentominoAntiClkWise(pentomino);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
}

GameController.prototype.rotatePentominoClkWise = function (pentomino) {
    let success = this._board.rotatePentominoClkWise(pentomino);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
}

GameController.prototype.mirrorPentominoH = function (pentomino) {
    let success = this._board.mirrorPentominoH(pentomino);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
}

GameController.prototype.mirrorPentominoV = function (pentomino) {
    let success = this._board.mirrorPentominoV(pentomino);
    if (success) {
        // Maybe as matrix? -> introduce pentomino method, which generates matrix from occupied cells
        return pentomino.occupied_cells;
    } else {
        return null;
    }
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

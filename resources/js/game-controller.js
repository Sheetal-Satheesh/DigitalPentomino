class GameController {
    constructor() {
        this._board = null;
    }

    // --- --- --- Pentomino Operations --- --- ---
    movePentominoToPosition(pentomino, x, y) {
        return this._board.placePentomino(pentomino, x, y);
    }

    rotatePentominoAntiClkWise(pentomino) {
        return this._board.rotatePentominoAntiClkWise(pentomino);
    }

    rotatePentominoClkWise(pentomino) {
        return this._board.rotatePentominoClkWise(pentomino);
    }

    mirrorPentominoH(pentomino) {
        return this._board.mirrorPentominoH(pentomino);
    }

    mirrorPentominoV(pentomino) {
        return this._board.mirrorPentominoV(pentomino);
    }

    // --- --- --- Set Game --- --- ---
    setGame(board) {
        this._board = board;
    }

    // --- --- --- Debugging --- --- ---
    display() {
        this._board.display();
    }

    writeToDocument() {
        this._board.writeToDocument();
    }

    // --- --- --- Get Information About The Game For Loading --- --- ---
    getBoardSize() {
        if (this._board === null) throw new Error("Game is not set");
        return this._board.size;
    }

    getPentominos() {
        if (this._board === null) throw new Error("Game is not set");
        return this._board.getPentominos();
    }

    getPositionOfPentomino(pentomino) {
        if (this._board === null) throw new Error("Game is not set");
        return this._board.getPosition(pentomino);
    }

    // --- --- --- Get Information About The Game For User Interaction --- --- ---
    getPentominoAtPosition(x, y) {
        if (this._board === null) throw new Error("Game is not set");
        return this._board.getPentominoAtPosition(x, y);
    }
}

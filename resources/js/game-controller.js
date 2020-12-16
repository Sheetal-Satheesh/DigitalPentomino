class GameController {
    constructor() {
        this._board = null;
        this._tempPentomino = new Pentomino('T');
    }

    // --- --- --- Pentomino Operations --- --- ---
    movePentominoToPosition(pentomino, x, y) {
        if (this._board === null) throw new Error("Game is not set");

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.placePentomino(pentomino, x, y);
    }

    rotatePentominoAntiClkWise(pentomino) {
        if (this._board === null) throw new Error("Game is not set");

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.rotatePentominoAntiClkWise(pentomino);
    }

    rotatePentominoClkWise(pentomino) {
        if (this._board === null) throw new Error("Game is not set");

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.rotatePentominoClkWise(pentomino);
    }

    mirrorPentominoH(pentomino) {
        if (this._board === null) throw new Error("Game is not set");

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.mirrorPentominoH(pentomino);
    }

    mirrorPentominoV(pentomino) {
        if (this._board === null) throw new Error("Game is not set");

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.mirrorPentominoV(pentomino);
    }

    // --- --- --- Set Game --- --- ---
    setGame(board) {
        this._board = board;
    }

    // --- --- --- Debugging --- --- ---
    display() {
        if (this._board === null) throw new Error("Game is not set");

        this._board.display();
    }

    writeToDocument() {
        if (this._board === null) throw new Error("Game is not set");

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

        if (pentomino === null || pentomino === undefined) throw new Error("Type Error: Pentomino is null or undefined");
        if(!(Object.getPrototypeOf(pentomino) === Object.getPrototypeOf(this._tempPentomino)))
            throw new Error("Type Error: Pentomino isn't an instance of the Pentomino class.");

        return this._board.getPosition(pentomino);
    }

    // --- --- --- Get Information About The Game For User Interaction --- --- ---
    getPentominoAtPosition(x, y) {
        if (this._board === null) throw new Error("Game is not set");
        return this._board.getPentominoAtPosition(x, y);
    }
}

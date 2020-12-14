function GameLoader() {

}

GameLoader.prototype.loadByName = function (name) {
    let board;

    // create pentamino pieces
    let penX = new Pentomino('X');
    let penT = new Pentomino('T');
    let penL = new Pentomino('L');
    let penU = new Pentomino('U');

    switch (name) {
        case "Level 1":
            // Create a board
            board = new Board([5, 5]);

            // add pieces to board
            board.prototype.placePentamino(penX, 0, 0);
            board.prototype.placePentamino(penT, 3, 0);
            document.write("Starting level 1");
            break;
        case "Level 2":
             // Create a board
            board = new Board([7, 7]);

            // add pieces to board
            board.prototype.placePentamino(penT, 0, 1);
            board.prototype.placePentamino(penX, 4, 0);
            board.prototype.placePentamino(penU, 0, 3);
            board.prototype.placePentamino(penL, 3, 3);
            document.write("Starting level 2");
            break;
        case "Level 3":
            // Create a board
            board = new Board([8, 8]);

            // add pieces to board
            board.prototype.placePentamino(penT, 3, 0);
            board.prototype.placePentamino(penX, 0, 5);
            board.prototype.placePentamino(penU, 3, 3);
            board.prototype.placePentamino(penL, 3, 6);
            document.write("Starting level 3");
            break;
        default:
            throw new Error("No game found with the name '" + name + "'");
    }

    return board;
}

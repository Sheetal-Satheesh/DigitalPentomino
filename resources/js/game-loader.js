class GameLoader {

    static loadByName(name) {
        let board;

        // create pentamino pieces
        let penX = new Pentomino('X');
        let penT = new Pentomino('T');
        let penL = new Pentomino('L');
        let penU = new Pentomino('U');
        let penP = new Pentomino('P');


        switch (name) {

            case "Level 1":
                // Create a board
                board = new Board([5, 5]);
                // add pieces to board
                board.placePentomino(penX, 0, 0);
                board.placePentomino(penL, 3, 0);
                document.write("Starting level 1.."+ "<br>");
                break;

            case "Level 2":
                // Create a board
                board = new Board([7, 7]);
                // add pieces to board
                board.placePentomino(penT, 0, 1);
                board.placePentomino(penX, 4, 0);
                board.placePentomino(penU, 0, 4);
                board.placePentomino(penL, 3, 3);
                document.write("Starting level 2.."+ "<br>");
                break;

            case "Level 3":
                // Create a board
                board = new Board([8, 9]);
                // add pieces to board
                board.placePentomino(penT, 3, 0);
                board.placePentomino(penX, 0, 5);
                board.placePentomino(penU, 3, 3);
                board.placePentomino(penP, 3, 6);
                document.write("Starting level 3.."+ "<br>");
                break;

            default:
                throw new Error("No game found with the name '" + name + "'");
        }

        return board;
    }
}

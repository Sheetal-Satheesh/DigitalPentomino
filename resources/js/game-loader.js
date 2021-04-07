if(typeof require != 'undefined') {
    Game = require('./game.js');
    Board = require('./board.js');
}

class GameLoader {

    static loadByName(name) {
        let game;

        // create pentamino pieces
        let penX = new Pentomino('X');
        let penT = new Pentomino('T');
        let penL = new Pentomino('L');
        let penU = new Pentomino('U');
        let penN = new Pentomino('N');
        let penF = new Pentomino('F');
        let penI = new Pentomino('I');
        let penP = new Pentomino('P');
        let penZ = new Pentomino('Z');
        let penV = new Pentomino('V');
        let penW = new Pentomino('W');
        let penY = new Pentomino('Y');

        switch (name) {
            case "Level 1":
                // Create a board
                game = new Game(new Board([0,0],[7,5]));
                // add pieces to board
                game.placePentomino(penL, 1, 3);
                game.placePentomino(penX, -1, -5);
 //               document.write("Starting level 1.."+ "<br>");
                break;
                
            case "Level 2":
                // Create a board
                game = new Game(new Board([0,0],[7,7]));
                // add pieces to board
                game.placePentomino(penT, 0, 1);
                game.placePentomino(penX, 4, 0);
                game.placePentomino(penU, 0, 4);
                game.placePentomino(penL, 3, 3);
                game.placePentomino(penF, 10, 3);
                game.placePentomino(penP, 5, 8);
                game.placePentomino(penZ, 5, -3);
                game.placePentomino(penN, 12, -6);
                game.placePentomino(penY, 19, 7);
                game.placePentomino(penI, 25, 9);
                game.placePentomino(penW, 17, 3);
                game.placePentomino(penV, 13, 3);
     //           document.write("Starting level 2.."+ "<br>");
                break;

            case "Level 3":
                // Create a board
                game = new Game(new Board([0,0],[8,9]));
                // add pieces to board
                game.placePentomino(penT, 3, 0);
                game.placePentomino(penX, 0, 5);
                game.placePentomino(penU, 3, 3);
                game.placePentomino(penP, 3, 6);
  //              document.write("Starting level 3.."+ "<br>");
                break;

            case "Level 4":
                // Create a board
                game = new Game(new Board([0,0],[6,10]));
                // add pieces to board
                game.placePentomino(penT, 1, 1);
                game.placePentomino(penX, 1, 0);
                game.placePentomino(penU, 0, 0);
                game.placePentomino(penP, 0, 0);
//                document.write("Starting level 4.."+ "<br>");
                break;
            case "Level 5":
                // Create a board
                game = new Game(new Board([3,7],[6,10]));
                // add pieces to board
                game.placePentomino(penT, 4, 9);
                game.placePentomino(penX, 4, 15);
                game.placePentomino(penU, 4, 15);
                game.placePentomino(penL, 5, 12);
                game.placePentomino(penF, 5, 12);
                game.placePentomino(penN, 4, 15);
                game.placePentomino(penY, 19, 7);
                game.placePentomino(penI, 5, 7);
                game.placePentomino(penW, 17, 3);
                game.placePentomino(penV, 6, 8);
     //           document.write("Starting level 2.."+ "<br>");
                break;


            default:
                throw new Error("No game found with the name '" + name + "'");
        }

        return game;
    }

 


    /**
     * Returns all boards with configurations and solutions
     */
    static getAllBoards(){
        let boardsWithConfig = [];
        if(baseConfigs != undefined && boardConfigs != undefined){
            if(baseConfigs.hasOwnProperty("boards")){
                baseConfigs.boards.forEach(board => {
                    if(boardConfigs.hasOwnProperty(board)){
                        boardsWithConfig.push(board);
                    }
                });
            }else{
                throw new Error("Error in configuration: Could not find any boards");    
            }
        } else{
            throw new Error("Error in configuration: Could not find basic game configurations");
        }
        return boardsWithConfig;
    }

    /**
     * Returns a game object of the selected/default game that can be used to draw the board
     */
    static getGameObject(board){
        return {
            gameHeight: boardConfigs[board].gameHeight || baseConfigs.gameHeight,
            gameWidth: boardConfigs[board].gameWidth || baseConfigs.gameWidth,
            boardSize: boardConfigs[board].boardSize,
            blockedCells: boardConfigs[board].blockedCells || undefined,
            boardShape: boardConfigs[board].boardShape || baseConfigs.boardShape
        };
    }
}

if(typeof module != 'undefined') {
    module.exports = GameLoader;
}

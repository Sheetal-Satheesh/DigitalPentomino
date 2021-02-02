if(typeof require != 'undefined') {
    Game = require('./game.js');
    Board = require('./board.js');
}

const solutionsString = "1, FFIIIII LFFNNNY LFNNUUY LPPPUYY LLPPUUY \n\ 2, FFIIIII LFFPPUU LFXPPPU LXXXYUU LLXYYYY \n\ 3, FFIIIII LFFUUUY LFXUTUY LXXXTYY LLXTTTY \n\ 4, FFIIIII LFFWPPP LFWWPPT LWWYTTT LLYYYYT";

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

            default:
                throw new Error("No game found with the name '" + name + "'");
        }

        return game;
    }

    static getGamesFromSolutionsConfig(){
        let gameArray = [];
        console.log("Calling getGamesFromSolutionsConfig");

        //TODO: somehow obtain the txt file from fetch/FS/...
        let fileString = solutionsString;
        let fileLines = fileString.split("\n");
        for (let i = 0; i < fileLines.length; i++) {
            let line = fileLines[i];
            line = line.split(",")[1];
            line = line.trim();
            
            let game = this.getGameFromString(line);
            gameArray.push(game);
        }

        return gameArray;
    }

    /*TODO: Move to gameLoader class */
    static getGameFromString(gameString) {
            
        let rows = gameString.split(" ");
        let height = rows.length;
        let width = rows[0].length;
        console.log("Initialize game with height: " + height + " and width: " + width);
        let game = new Game(new Board([0, 0], [height, width]));

        //prepare pentominos for the board
        let X = new Pentomino('X');
        let T = new Pentomino('T');
        let L = new Pentomino('L');
        let U = new Pentomino('U');
        let N = new Pentomino('N');
        let F = new Pentomino('F');
        let I = new Pentomino('I');
        let P = new Pentomino('P');
        let Z = new Pentomino('Z');
        let V = new Pentomino('V');
        let W = new Pentomino('W');
        let Y = new Pentomino('Y');

        let pentos = [X,T,L,U,N,F,I,P,Z,V,W,Y];

        pentos.forEach(pento => {

            let hasNextOp = true;
            let opsAmount = 0;

            while (hasNextOp){
                //getMatrixRep for current element
                let matrixRep = pento.getMatrixRepresentation();
                //console.log(matrixRep);

                let boardRep = this.normalizeBoard(gameString, pento.name);
                //console.log(boardRep);

                let position = this.findInParent(matrixRep, boardRep);
                if (position != null){
                    //TODO: Place pentomino on Board
                    console.log("Center of piece " + pento.name + " found: " + position);
                    console.log("Placing element" + pento.name + " on board...");
                    game.placePentomino(pento, position[0], position[1]);
                    hasNextOp = false;
                } else {
                    //try with different rotate/flip of same pento until all 10 possibilites are reached
                    hasNextOp = this.doNextOperationOnPento(pento, opsAmount);
                    opsAmount = opsAmount+1;
                }
            }
            
        });

        return game;
    }


    static doNextOperationOnPento(pentomino, x){
        
        switch (x) {
            case 0:
                pentomino.rotateClkWise();
                return true;
                break;
            case 1:
                pentomino.mirrorV();
                return true;
                break;
            case 2:
                pentomino.mirrorV();
                return true;
                break;
            case 3:
                pentomino.rotateClkWise();
                return true;
                break;
            case 4:
                pentomino.mirrorV();
                return true;
                break;
            case 5:
                pentomino.mirrorV();
                return true;
                break;
            case 6:
                pentomino.rotateClkWise();
                return true;
                break;
            case 7:
                pentomino.mirrorV();
                return true;
                break;
            case 8:
                pentomino.mirrorV();
                return true;
                break;
            case 9:
                pentomino.rotateClkWise();
                return true;
                break;
            case 10:
                pentomino.mirrorV();
                return true;
                break;
            case 11:
                pentomino.mirrorV();
                return false;
                break;
            default:
                console.log("Strange behavior in findingNextOp...");
                return false;
                break;
        }

    }


    static findInParent(smallMatrix, bigMatrix){
        let centerPosition = [0,0];

        let a = bigMatrix;
        let b = smallMatrix;

        //iterate over bigger matrix
        for (let i = 0; i < a.length - b.length + 1; i++) {
            for (let j = 0; j < a[0].length - b[0].length + 1; j++) {
                if (a[i][j] == b[0][0]) {
                    let flag = true;
                    for (let k = 0; k < b.length; k++) {
                        for (let l = 0; l < b[0].length; l++) {
                            if (a[i + k][j + l] != b[k][l]) {
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (flag) {
                        centerPosition = [i, j];
                        return centerPosition;
                    }
                }
            }
        }
        return null;
    }


    static normalizeBoard(gameString, element){
        let rows = gameString.split(" ");
        let height = rows.length;
        let width = rows[0].length;

        // IMPORTANT: normalized board will have +2 height and +2 width to include borders for check
        let nBoard = Array(height+4).fill(0).map(() => new Array(width+4).fill(0));
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let stringElement = rows[i][j];
                if (stringElement == element){
                    nBoard[i+2][j+2] = 1;
                }   
            }
        }    

        return nBoard;
    }


    static transform(someString, element){
        //e.g. take "FFIIIIILFFPPUULFXPPPULXXXYUULLXYYYY" and "X" as input
        let resultString='';
        
        for (var i = 0; i < someString.length; i++) {
            let stringElement = someString[i];
            if (stringElement == element){
                resultString += '1'
            } else {
                resultString += '0'
            }
        }
        
        return resultString;
    }
}

if(typeof module != 'undefined') {
    module.exports = GameLoader;
}

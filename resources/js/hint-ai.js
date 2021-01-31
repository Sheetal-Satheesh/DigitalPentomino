if(typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    Board = require('./board.js');
    Game = require('./game.js');
    Hint = require('./hint.js');
}

class HintAI {

    solutionsString = "1, FFIIIII LFFNNNY LFNNUUY LPPPUYY LLPPUUY \n\ 2, FFIIIII LFFPPUU LFXPPPU LXXXYUU LLXYYYY \n\ 3, FFIIIII LFFUUUY LFXUTUY LXXXTYY LLXTTTY \n\ 4, FFIIIII LFFWPPP LFWWPPT LWWYTTT LLYYYYT";

    setSolutionsString(solString){
        this.solutionsString = solString;
    }

    getHint(game) {
        let solutions = this._getMockSolutions();
        let closestSolution = this._getClosesSolution(game, solutions);
        return this._getNextCommandToSolution(game, closestSolution);
    }

    // --- --- --- Closest Solution --- --- ---
    /**
     *  Priority:
     *  - Perfect pentominoes on the board (Correct position, correct angle, correct mirroring)
     *  - Pentominoes that need one operation to be perfect
     *  - Pentominoes that need two operations to be perfect
     *  - etc.
     * @param game
     * @param solutions
     * @returns {*}
     */
    _getClosesSolution(game, solutions) {
        // FIXME
        return solutions[0];
    }

    // --- --- --- Pursue Closest Solution --- --- ---
    /**
     * Returns the next command that, when executed, brings the game closer to the solution.
     * @param game
     * @param solution
     * @returns {null}
     */
    _getNextCommandToSolution(game, solution) {
        let command = null;

        if (game.getPentominoes().length === 0) {
            throw new Error("game is empty");
        }

        game.getPentominoes().some(pentomino =>  {
            if (!this._isPerfectPentomino(game, solution, pentomino)) {
                command = this._getNextCommandOfPentominoToSolution(game, solution, pentomino);
                return true;
            }
            return false;
        });

        if (command === null || command === undefined) {
            throw new Error("No next command found");
        }

        return new Hint(command);
    }

    /**
     * Returns a command of a specific pentomino, that brings the game closer to the solution
     * @param game
     * @param solution
     * @param gamePentomino
     */
    _getNextCommandOfPentominoToSolution(game, solution, gamePentomino) {
        let solutionPentomino = solution.getPentominoByName(gamePentomino.name);

        if (solutionPentomino === null) {
            if (game.isPlacedOnBoard(gamePentomino)) {
                let gamePentominoPos = game.getPosition(gamePentomino);
                return new RemoveCommand(game, gamePentomino, gamePentominoPos[0], gamePentominoPos[1]);
            } else {
                throw Error("Pentomino " + gamePentomino.name + " is already placed correct.");
            }
        }

        if (game.isPlacedOnBoard(gamePentomino)) {
            if (solution.isPlacedOnBoard(solutionPentomino)) {
                // problem lies inside board
                return this._getNextCommandOfPentominoOnBoardToSolution(game, solution, gamePentomino, solutionPentomino);
            } else {
                // place should be outside board
                let gamePentominoPos = game.getPosition(gamePentomino);
                // FIXME - add to tray
                return new RemoveCommand(game, gamePentomino, gamePentominoPos[0], gamePentominoPos[1]);
            }
        } else {
            if (solution.isPlacedOnBoard(solutionPentomino)) {
                // pentomino should be on board
                let solutionPentominoPosition = solution.getPosition(solutionPentomino);
                return new PlaceCommand(game, gamePentomino, solutionPentominoPosition[0], solutionPentominoPosition[1]);
            } else {
                // perfect pentomino
                throw Error("Pentomino " + gamePentomino.name + " is already placed correct.");
            }
        }
    }

    _getNextCommandOfPentominoOnBoardToSolution(game, solution, gamePentomino, solutionPentomino) {
        // Check if wrong position
        let gamePentominoPosition = game.getPosition(gamePentomino);
        let solutionPentominoPosition = solution.getPosition(solutionPentomino);

        if (gamePentominoPosition[0] === solutionPentominoPosition[0]
                && gamePentominoPosition[1] === solutionPentominoPosition[1]) {
            // Correct position
            let operations = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentomino, solutionPentomino, [], []);

            if (operations === null || operations === undefined) {
                throw new Error("State error: no operation sequence found to reach desired pentomino state");
            } else if (operations.length === 0) {
                throw new Error("Illegal State exception");
            } else {
                switch (operations[0].name) {
                    case "rotateClkWise":
                        return new RotateClkWiseCommand(game, gamePentomino);
                    case "rotateAntiClkWise":
                        return new RotateAntiClkWiseCommand(game, gamePentomino);
                    case "mirrorH":
                        return new MirrorHCommand(game, gamePentomino);
                    case "mirrorV":
                        return new MirrorVCommand(game, gamePentomino);
                    default:
                        throw new Error("Unrecognized pentomino operation: '" + operations.name + "'");
                }
            }

        } else {
            // Incorrect position
            return new MoveToPositionCommand(game, gamePentomino, solutionPentominoPosition[0], solutionPentominoPosition[1]);
        }
    }

    _searchShortestWayForCorrectPentominoState(game, solution, gamePentomino, solutionPentomino, executedOperations, currentBestOperationPath) {
        if (gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0) {
            currentBestOperationPath.length = 0;
            executedOperations.forEach(operation => currentBestOperationPath.push(operation));
            return currentBestOperationPath;
        }

        if (executedOperations.length >= 3 || (currentBestOperationPath.length > 0 && executedOperations.length >= currentBestOperationPath.length)) {
            return null;
        }

        // No finish -> search goes on
        let result = null;

        let gamePentominoRotateClkWiseCopy = this._executePentominoOperationOnCopy(
            pentomino => pentomino.rotateClkWise(), "rotateClkWise", gamePentomino, executedOperations);
        let rotateClkWiseResult = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentominoRotateClkWiseCopy, solutionPentomino, executedOperations, currentBestOperationPath);
        if (!(rotateClkWiseResult === null)) result = rotateClkWiseResult;
        executedOperations.pop();

        let gamePentominoRotateAntiClkWiseCopy = this._executePentominoOperationOnCopy(
            pentomino => pentomino.rotateAntiClkWise(), "rotateAntiClkWise", gamePentomino, executedOperations);
        let rotateAntiClkWiseResult = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentominoRotateAntiClkWiseCopy, solutionPentomino, executedOperations, currentBestOperationPath);
        if (!(rotateAntiClkWiseResult === null)) result = rotateAntiClkWiseResult;
        executedOperations.pop();

        let gamePentominoCopyMirrorHCopy = this._executePentominoOperationOnCopy(
            pentomino => pentomino.mirrorH(), "mirrorH", gamePentomino, executedOperations);
        let mirrorHResult = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentominoCopyMirrorHCopy, solutionPentomino, executedOperations, currentBestOperationPath);
        if (!(mirrorHResult === null)) result = mirrorHResult;
        executedOperations.pop();

        let gamePentominoMirrorVCopy = this._executePentominoOperationOnCopy(
            pentomino => pentomino.mirrorV(), "mirrorV", gamePentomino, executedOperations);
        let mirrorVResult = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentominoMirrorVCopy, solutionPentomino, executedOperations, currentBestOperationPath);
        if (!(mirrorVResult === null)) result = mirrorVResult;
        executedOperations.pop();

        return result;
    }

    _executePentominoOperationOnCopy(operation, operationName, gamePentomino, executedOperations) {
        executedOperations.push({
            "name": operationName,
            "operation": operation
        });
        let gamePentominoCopy = new Pentomino(gamePentomino.name);
        Object.assign(gamePentominoCopy, gamePentomino);
        executedOperations[executedOperations.length - 1].operation(gamePentominoCopy);

        return gamePentominoCopy;
    }

    /**
     * Assumes that pentomino is placed on the board
     * @param game
     * @param solution
     * @param gamePentomino
     */
    _isPerfectPentomino(game, solution, gamePentomino) {
        let solutionPentomino = solution.getPentominoByName(gamePentomino.name);

        if (solutionPentomino === null) {
            return !game.isPlacedOnBoard(gamePentomino);
        }

        if (!game.isPlacedOnBoard(gamePentomino))
            return !solution.isPlacedOnBoard(solutionPentomino);
        else if (solution.isPlacedOnBoard(solutionPentomino)) {
            let gamePentominoPosition = game.getPosition(gamePentomino);
            let solutionPentominoPosition = solution.getPosition(solutionPentomino);
            return gamePentominoPosition[0] === solutionPentominoPosition[0]
                && gamePentominoPosition[1] === solutionPentominoPosition[1]
                && gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0;
        } else {
            return false;
        }
    }

    // --- --- ---- Load Solutions --- --- ---
    _getMockSolutions() {
        let solutions = [];

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

        let game1 = new Game(new Board([0, 0], [5, 7]));

        game1.placePentomino(L, 3, 0);

        game1.placePentomino(F, 1, 1);
        game1.mirrorPentominoV(F);

        game1.placePentomino(I, 0, 4);
        game1.rotatePentominoClkWise(I);

        game1.placePentomino(N, 1, 3);
        game1.rotatePentominoClkWise(N);
        game1.mirrorPentominoH(N);

        game1.placePentomino(P, 4, 2);
        game1.rotatePentominoClkWise(P);

        game1.placePentomino(U, 3, 4);
        game1.rotatePentominoClkWise(U);

        game1.placePentomino(Y, 3, 5);
        game1.rotatePentominoAntiClkWise(Y);
        game1.mirrorPentominoH(Y);

        game1.display();

        let X2 = new Pentomino('X');
        let T2 = new Pentomino('T');
        let L2 = new Pentomino('L');
        let U2 = new Pentomino('U');
        let N2 = new Pentomino('N');
        let F2 = new Pentomino('F');
        let I2 = new Pentomino('I');
        let P2 = new Pentomino('P');
        let Z2 = new Pentomino('Z');
        let V2 = new Pentomino('V');
        let W2 = new Pentomino('W');
        let Y2 = new Pentomino('Y');

        let game2 = new Game(new Board([0, 0], [5, 7]));

        game2.placePentomino(L2, 3, 0);

        game2.placePentomino(I2, 0, 4);
        game2.rotatePentominoClkWise(I2);

        game2.placePentomino(F2, 1, 1);
        game2.mirrorPentominoV(F2);

        game2.placePentomino(P2, 1, 4);
        game2.rotatePentominoAntiClkWise(P2);

        game2.placePentomino(X2, 3, 2);

        game2.placePentomino(U2, 2, 6);
        game2.rotatePentominoAntiClkWise(U2);

        game2.placePentomino(Y2, 3, 4);
        game2.mirrorPentominoV(Y2);

        game2.display();

        solutions.push(game1);
        solutions.push(game2);
        return solutions;
    }

    getGamesFromSolutionsConfig(){
        let gameArray = [];
        console.log("Calling getGamesFromSolutionsConfig");

        //TODO: somehow obtain the txt file from fetch/FS/...
        let fileString = this.solutionsString;
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
    getGameFromString(gameString) {
            
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


    doNextOperationOnPento(pentomino, x){
        
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


    findInParent(smallMatrix, bigMatrix){
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


    normalizeBoard(gameString, element){
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


    transform(someString, element){
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
    module.exports = HintAI;
}

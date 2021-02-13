if(typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    Board = require('./board.js');
    Game = require('./game.js');
    Hint = require('./hint.js');
}

class HintAI {

    loadGameForHinting(game) {
        this._game = game;
        this._solutions = GameLoader.getGamesFromSolutionsConfig(game.getName());
    }

    getHint() {
        if (this._game === null || this._game === undefined) {
            throw new Error("No build set (call loadGameForHinting)");
        }

        let game = this._game;
        let possibleSolutions = this._getPossibleSolutions(game, this._solutions);
        if (possibleSolutions.length > 0) {
            // Pursue closest solution
            let closestSolution = possibleSolutions[0];
            let commands = this._getNextCommandsToSolution(game, closestSolution, false);
            // TODO - do smarter things with commands
            return new Hint(commands[0], possibleSolutions);
        } else {
            // Pursue closest game state, which has at least one possible solution
            let closestSolution = this._getClosesSolution(game, this._solutions);
            let commands = this._getNextCommandsToSolution(game, closestSolution, true);
            if (commands.length === 1) {
                return new Hint(commands[0], possibleSolutions);
            } else {
                return new Hint(
                    new RemoveCommand(game, commands[0]._pentomino, commands[0]._row, commands[0]._col),
                    possibleSolutions
                );
            }
        }
    }

    // --- --- --- Number of possible Solutions --- --- ---
    _getPossibleSolutions(game, solutions) {
        if (game.getPentominoes().length === 0) {
            throw new Error("game is empty");
        }

        let possibleSolutions = [];
        solutions.forEach(solution => {
            let allPentominoesOnBoardArePerfect = game.getPentominoes()
                .filter(pentomino => game.isPlacedOnBoard(pentomino))
                .every(pentominoOnBoard => {
                    return this._isPerfectPentomino(game, solution, pentominoOnBoard.name);
                });
            if (allPentominoesOnBoardArePerfect) {
                possibleSolutions.push(solution);
            }
        });

        return possibleSolutions;
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
        let closestSolution = null;
        let numOfPerfectPentominoesOnBoardOfClosestSolution = -1;

        solutions.forEach(solution => {
            let numOfPerfectPentominoesOnBoard = 0;
            let counter = 0;
            let numOfPentominoes = game.getPentominoes().length;

            game.getPentominoes().filter(p => game.isPlacedOnBoard(p)).every(gamePentomino => {
                let remainingPentominoes = numOfPentominoes - counter;
                let maxPossibleNumOfPerfectPentominoes = remainingPentominoes + numOfPerfectPentominoesOnBoard;
                if (maxPossibleNumOfPerfectPentominoes <= numOfPerfectPentominoesOnBoardOfClosestSolution) {
                    return false;
                }

                if (this._isPerfectPentomino(game, solution, gamePentomino.name)) {
                    numOfPerfectPentominoesOnBoard++;
                }
                counter++;
                return true;
            });

            if (numOfPerfectPentominoesOnBoard > numOfPerfectPentominoesOnBoardOfClosestSolution) {
                closestSolution = solution;
                numOfPerfectPentominoesOnBoardOfClosestSolution = numOfPerfectPentominoesOnBoard;
            }
        });
        return closestSolution;
    }

    // --- --- --- Pursue Closest Solution --- --- ---
    /**
     * Returns the next command that, when executed, brings the game closer to the solution.
     * @param game
     * @param solution
     * @returns {null}
     */
    _getNextCommandsToSolution(game, solution, backtracking) {
        if (game.getPentominoes().length === 0) {
            throw new Error("game is empty");
        }

        let pentomino;
        if (backtracking) {
            pentomino = game.getPentominoes().find(p => !this._isPerfectPentomino(game, solution, p.name));
        } else {
            let pentominoesOnBoard = game.getPentominoes().filter(p => game.isPlacedOnBoard(p));
            pentomino = pentominoesOnBoard.find(p => !this._isPerfectPentomino(game, solution, p.name));
            if (pentomino === undefined || pentomino === null) {
                // no non perfect pentominoes inside the board
                pentomino = game.getPentominoes().filter(p => !game.isPlacedOnBoard(p)).find(p => !this._isPerfectPentomino(game, solution, p.name));
            }
        }

        if (pentomino === null || pentomino === undefined) {
            // TODO - handle differently
            throw new Error("All pentominoes are placed perfect");
        }

        let commands = this._getNextCommandsOfPentominoToSolution(game, solution, pentomino);

        if (commands === null || commands === undefined) {
            throw new Error("No next commands found");
        }

        // FIXME - maybe return several commands
        return commands;
    }

    /**
     * Returns a command of a specific pentomino, that brings the game closer to the solution
     * @param game
     * @param solution
     * @param gamePentomino
     */
    _getNextCommandsOfPentominoToSolution(game, solution, gamePentomino) {
        let solutionPentomino = solution.getPentominoByName(gamePentomino.name);

        if (solutionPentomino === null) {
            if (game.isPlacedOnBoard(gamePentomino)) {
                let gamePentominoPos = game.getPosition(gamePentomino);
                return [new RemoveCommand(game, gamePentomino, gamePentominoPos[0], gamePentominoPos[1])];
            } else {
                throw Error("Pentomino " + gamePentomino.name + " is already placed correct.");
            }
        }

        if (game.isPlacedOnBoard(gamePentomino)) {
            if (solution.isPlacedOnBoard(solutionPentomino)) {

                if (!(gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0)) {
                    // some local operations need to be performed on the pentomino
                    return this._getNextLocalCommandsOfPentominoToSolution(game, solution, gamePentomino, solutionPentomino);
                } else {
                    // pentomino needs to change position
                    let solutionPentominoPosition = solution.getPosition(solutionPentomino);
                    let solutionPentominoRelPosition = [
                        solutionPentominoPosition[0] + game._board._boardSRows,
                        solutionPentominoPosition[1] + game._board._boardSCols
                    ];

                    return [new PlaceCommand(game, gamePentomino, solutionPentominoRelPosition[0], solutionPentominoRelPosition[1])];
                }
            } else {
                // place should be outside board
                let gamePentominoPos = game.getPosition(gamePentomino);
                // FIXME - move outside and not move completely -> Eventually move to tray
                return [new RemoveCommand(game, gamePentomino, gamePentominoPos[0], gamePentominoPos[1])];
            }
        } else {
            if (solution.isPlacedOnBoard(solutionPentomino)) {
                // pentomino should be on board

                if (!(gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0)) {
                    // some local operations need to be performed on the pentomino
                    return this._getNextLocalCommandsOfPentominoToSolution(game, solution, gamePentomino, solutionPentomino);
                } else {
                    // pentomino needs to change position
                    let solutionPentominoPosition = solution.getPosition(solutionPentomino);
                    let solutionPentominoRelPosition = [
                        solutionPentominoPosition[0] + game._board._boardSRows,
                        solutionPentominoPosition[1] + game._board._boardSCols
                    ];

                    return [new PlaceCommand(game, gamePentomino, solutionPentominoRelPosition[0], solutionPentominoRelPosition[1])];
                }
            } else {
                // perfect pentomino
                throw Error("Pentomino " + gamePentomino.name + " is already placed correct.");
            }
        }
    }

    _getNextLocalCommandsOfPentominoToSolution(game, solution, gamePentomino, solutionPentomino) {
        // Correct position
        let operations = this._searchShortestWayForCorrectPentominoState(game, solution, gamePentomino, solutionPentomino, [], []);

        if (operations === null || operations === undefined) {
            throw new Error("State error: no operation sequence found to reach desired pentomino state");
        } else if (operations.length === 0) {
            throw new Error("Illegal State exception");
        } else {
            let commands = operations.map(operation => {
                switch (operation.name) {
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
            });

            if (game.isPlacedOnBoard(gamePentomino)) {
                let gamePentominoPosition = game.getPosition(gamePentomino);
                let solutionPentominoPosition = solution.getPosition(solutionPentomino);
                let solutionPentominoRelPosition = [
                    solutionPentominoPosition[0] + game._board._boardSRows,
                    solutionPentominoPosition[1] + game._board._boardSCols
                ];

                if (!(solutionPentominoRelPosition[0] === gamePentominoPosition[0])
                    || !(solutionPentominoRelPosition[1] === gamePentominoPosition[1])) {
                    commands.push(new PlaceCommand(game, gamePentomino, solutionPentominoRelPosition[0], solutionPentominoRelPosition[1]));
                }
            } else {
                let solutionPentominoPosition = solution.getPosition(solutionPentomino);
                let solutionPentominoRelPosition = [
                    solutionPentominoPosition[0] + game._board._boardSRows,
                    solutionPentominoPosition[1] + game._board._boardSCols
                ];
                commands.push(new PlaceCommand(game, gamePentomino, solutionPentominoRelPosition[0], solutionPentominoRelPosition[1]));
            }

            return commands;
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

    // --- --- --- Helper functions --- --- ---
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
    _isPerfectPentomino(game, solution, pentominoName) {
        let gamePentomino = game.getPentominoByName(pentominoName);
        let solutionPentomino = solution.getPentominoByName(pentominoName);

        if (gamePentomino === null && solutionPentomino === null) {
            // FIXME - should return the pentomino if its in the tray and not return null
            //throw new Error("Pentomino '" + pentominoName + "' does neither exist in the game nor in the solution");
            return true;
        }

        if (gamePentomino === null) {
            return !solution.isPlacedOnBoard(solutionPentomino);
        }

        if (solutionPentomino === null) {
            return !game.isPlacedOnBoard(gamePentomino);
        }

        if (!game.isPlacedOnBoard(gamePentomino))
            return !solution.isPlacedOnBoard(solutionPentomino);
        else if (solution.isPlacedOnBoard(solutionPentomino)) {
            let gamePentominoPosition = game.getPosition(gamePentomino);
            let solutionPentominoPosition = solution.getPosition(solutionPentomino);
            let solutionPentominoRelPosition = [
                solutionPentominoPosition[0] + game._board._boardSRows,
                solutionPentominoPosition[1] + game._board._boardSCols
            ]
            return gamePentominoPosition[0] === solutionPentominoRelPosition[0]
                && gamePentominoPosition[1] === solutionPentominoRelPosition[1]
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
}

if(typeof module != 'undefined') {
    module.exports = HintAI;
}

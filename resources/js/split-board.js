if (typeof require != 'undefined') {
    Pentomino = require('./pentomino.js');
    Board = require('./board.js');
    Game = require('./game.js');
    Hint = require('./hint.js');
    HintAI = require('./hint-ai.js');
}

class SplitBoard {

    constructor(game) {
        this._game = game;
        this._solutions = Solutions.getGamesFromSolutionsConfig(game.getName());
        this._finalSolution;
        this._partionedArray;
        this.count = 0;
    }

    splitByColor() {
        let game = this._game;
        let possibleSolutions = this._getPossibleSolutions(game, this._solutions);        
        let closestSolution;

        if (possibleSolutions.length > 0) {
            closestSolution = possibleSolutions[0];
            this._finalSolution = closestSolution;
        }
        else {
            closestSolution = this._getClosesSolution(game, this._solutions);
            this._finalSolution = closestSolution;
        }

        let orderPieces = this._operationForSplitting(closestSolution);        
        let relativePosAndPiece = this._getRelativePositionAndPiece(closestSolution, orderPieces);
        let partionedArray = this._splitArrayIntoChunks(relativePosAndPiece);
        return partionedArray;
    }

    splitFromLeftToRight() {
        let game = this._game;
        let possibleSolutions = this._getPossibleSolutions(game, this._solutions);
        let closestSolution;  
        // closestSolution = possibleSolutions[0]      
        closestSolution = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)];
        this._finalSolution = closestSolution;  

        let orderPieces = this._operationForSplitting(closestSolution); 
        let relativePosOfPieceWithAnchorPos = this._getRelativePositionOfPieceWithAnchorPosition(closestSolution, orderPieces);
        let partitionedArray = this._splitArrayIntoChunks(relativePosOfPieceWithAnchorPos);
        this._partionedArray = partitionedArray;
        return partitionedArray;
    }

    _operationForSplitting(closestSolution) {
        let pentominoAnchors = this._getPentominoesAndAnchorPos(closestSolution);
        let orderPieces = this._sortPiecesBasedOnAnchor(pentominoAnchors);
        return orderPieces; 
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
            
            return gamePentominoPosition[0] === solutionPentominoPosition[0]
                && gamePentominoPosition[1] === solutionPentominoPosition[1]
                && gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0;
        } else {
            return false;
        }
    }

     /** ---------------  Split Via Partition Checks- If Partition is Filled -------------*/
    partitionHasUnoccupiedPosition(pentomino) {               
        let game = this._game;
        let solution = this._finalSolution; 
        let pentominoName = pentomino.name;
        
        let gamePentomino = game.getPentominoByName(pentominoName);
        let solutionPentomino = solution.getPentominoByName(pentominoName);        
        
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
            return gamePentominoPosition[0] === solutionPentominoPosition[0]
                && gamePentominoPosition[1] === solutionPentominoPosition[1]
                && gamePentomino.sRepr.localeCompare(solutionPentomino.sRepr) === 0;
        } else {
            return false;
        }        
    }


    /** ---------------  Solutions-------------*/
    getSolutions() {
        if (this._solutions == undefined) {
            console.error("Solution is not set");
        }
        return this._solutions;
    }

    // --- --- --- Bubble Sort --- --- ---        
    _sortPiecesBasedOnAnchor(pentominoAnchors) {
        let len = pentominoAnchors.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1; j++) {
                if (pentominoAnchors[j][1][1] > pentominoAnchors[j + 1][1][1]) {
                    let tmp = pentominoAnchors[j];
                    pentominoAnchors[j] = pentominoAnchors[j + 1];
                    pentominoAnchors[j + 1] = tmp;
                }
            }
        }
        return pentominoAnchors;
    }

    // --- --- --- Get AnchorPosition and Pentominoes --- --- ---
    /**     
     * @param solutions
     * @returns [[pentominoes,anchorPosofPentominoes]]
     */
    _getPentominoesAndAnchorPos(closestSolution) {
        let pentominoAnchorPos = closestSolution._board._pentominoes.map(pent => {
            let solutionPentomino = closestSolution._board.getPentominoByName(pent.name);
            let pentominoAnchor = closestSolution._board.getPosition(solutionPentomino);
            return [pent.name, pentominoAnchor];
        });

        return pentominoAnchorPos;
    }

    // --- --- --- Calculate Position In Game --- --- ---
    /**        
     * @param solutions
     * @param sortedarray
     * @returns [*]
     */
    _getRelativePositionAndPiece(closestSolution, orderPieces) {
        let finalPosAndPiece = [];
        for (let i = 0; i < orderPieces.length; i++) {
            closestSolution._board._pentominoes.forEach(pent => {
                if (pent.name === orderPieces[i][0]) {
                    let solutionPentomino = closestSolution.getPentominoByName(pent.name);
                    let pentominoAnchor = closestSolution._board.getPosition(solutionPentomino);
                    let pentominoRelPositions = solutionPentomino.getRelPentominoPositions();
                    let pentominoPositions = pentominoRelPositions.map(relPosition => {
                        return solutionPentomino.getCoordinatePosition(pentominoAnchor, relPosition)
                    });                                          
                    
                    finalPosAndPiece.push([solutionPentomino, pentominoPositions]);
                }
            });
        }
        return finalPosAndPiece;
    }   


    // --- --- --- Calculate Position In Game --- --- ---
    /**     
     * @param game
     * @param solutions
     * @param sortedarray
     * @returns [*]
     */
    _getRelativePositionOfPieceWithAnchorPosition(closestSolution, orderPieces) {
        let finalPosAndPiece = [];
        for (let i = 0; i < orderPieces.length; i++) {
            closestSolution._board._pentominoes.forEach(pent => {
                if (pent.name === orderPieces[i][0]) {
                    let solutionPentomino = closestSolution.getPentominoByName(pent.name);
                    let pentominoAnchor = closestSolution._board.getPosition(solutionPentomino);
                    let pentominoRelPositions = solutionPentomino.getRelPentominoPositions();
                    let pentominoPositions = pentominoRelPositions.map(relPosition => {
                        return solutionPentomino.getCoordinatePosition(pentominoAnchor, relPosition)
                    });                    
                    finalPosAndPiece.push([solutionPentomino, pentominoPositions, orderPieces[i][1]]);
                }
            });
        }
        return finalPosAndPiece;
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
            let numOfPentominoes = game.getAllPentominoes().length;

            game.getAllPentominoes().filter(p => game.isPlacedOnBoard(p)).every(gamePentomino => {
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

    // --- --- --- Split Array Into Chunks --- --- ---    
    _splitArrayIntoChunks(closestSolution) {
        const n = 3;
        const result = [[], [], []];
        const commandSequences = Math.ceil(closestSolution.length / n)

        for (let element = 0; element < n; element++) {
            for (let i = 0; i < commandSequences; i++) {
                const value = closestSolution[i + element * commandSequences]
                if (!value) continue //avoid adding "undefined" values
                result[element].push(value);
            }
        }
        return result;
    }

    /** --------------Get Possible solutions------ **/
    _getPossibleSolutions(game, solutions) {
        if (game.getAllPentominoes().length === 0) {
            throw new Error("game is empty");
        }

        let possibleSolutions = [];
        solutions.forEach(solution => {
            let allPentominoesOnBoardArePerfect = game.getAllPentominoes()
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
}

if (typeof module != 'undefined') {
    module.exports = SplitBoard;
}

class Help {
    consttructor(game) {
        if(Help.instance instanceof Help) {
            return Help.instance
        }
        
        this._solutions = Solutions.getGamesFromSolutionsConfig(game.getName());
        this.isSplitActive = false;       
        Help.instance = this;
        this.bestSolution;
    }

    /** ---------------  Solutions-------------*/
    getSolutions() {
        if (this._solutions == undefined) {
            console.error("Solution is not set");
        }
        return this._solutions;
    }

    // --- --- --- Possible Solutions --- --- ---
    getPossibleSolutions(game, solutions) {
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

    // --- --- --- C
    getGameSolution(isSplitActive, eventSource = 0) { 
        // eventSource Value 0--> Hint, 1---> SplitFromLtoR, 2---> SplitByColor
        let possibleSolutions = this.getPossibleSolutions(game, this._solutions);
        let bestSolution;
        this.currentSolnForSplit = bestSolution;

        if(eventSource == 1) {
            bestSolution = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)];
            this.isSplitActive = true;
            this.currentSolnForSplit = bestSolution;

        } else if (eventSource == 2) {
            if (possibleSolutions.length > 0) {
                bestSolution = possibleSolutions[0];                
            } else {
                bestSolution = this.getClosestSolution(game, this._solutions);                
            }
            this.isSplitActive = true;
            this.currentSolnForSplit = bestSolution;
        } else {                        
            if(isSplitActive) {
                bestSolution = this.currentSolnForSplit;
            } else {
                if (possibleSolutions.length > 0) {
                    bestSolution = possibleSolutions[0];
                } else {
                    bestSolution = this.getClosestSolution(game, this._solutions);
                }
            }
        }
        return bestSolution;       
    }

    clearSplitActiveFlag() {        
        this.isSplitActive = false;        
    }

    getClosestSolution(game, solutions) {
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


}
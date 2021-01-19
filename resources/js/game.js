if(typeof require != 'undefined') {
    CommandManager = require('./command-history/command-manager.js');
    PlaceCommand = require('./command-history/place-command.js');
    MoveToPositionCommand = require('./command-history/move-to-position-command.js');
    RotateAntiClkWiseCommand = require('./command-history/rotate-anti-clk-wise-command.js');
    RotateClkWiseCommand = require('./command-history/rotate-clk-wise-command.js');
    MirrorHCommand = require('./command-history/mirror-h-command.js');
    MirrorVCommand = require('./command-history/mirror-v-command.js');
    RemoveCommand = require('./command-history/remove-command.js');
}

class Game {
    constructor(board) {
        this._board = board;
        this._commandManager = new CommandManager();

        this._pentominosOutside = [];
        this._pentominoOutsidePositions = [];
    }

    // --- --- --- Pentomino Operations --- --- ---
    /**
     * Executes the specified and adds it to the history tree.
     * Commands can be undone with the undo() and redo() methods.
     * @param command
     * @returns {*}
     */
    doCommandAndAddToHistory(command) {
        return this._commandManager.executeNewCommand(command);
    }

    /**
     * Adds new pentomino to game
     * @param pentomino
     * @param x
     * @param y
     */
    placePentomino(pentomino, x, y) {
        let newPentominoPositionIsOnBoard = this._board.pentominoIsValidAtPosition(pentomino, x, y);
        if (newPentominoPositionIsOnBoard) {
            this._board.placePentomino(pentomino, x, y);
        } else {
            this._placePentominoOutsideBoard(pentomino, x, y);
        }
    }

    /**
     * Assumes that the pentomino already exists
     * @param pentomino
     * @param x
     * @param y
     */
    movePentominoToPosition(pentomino, x, y) {
        if (!this.isPlacedInGame(pentomino)) {
            throw new Error("Pentomino \'" + pentomino.name + "\' is not placed in the game");
        }

        let oldPentominoPositionIsOnBoard = this._board.isPlacedOnBoard(pentomino);
        let newPentominoPositionIsOnBoard = this._board.pentominoIsValidAtPosition(pentomino, x, y);

        if (oldPentominoPositionIsOnBoard) {
            if (newPentominoPositionIsOnBoard) {
                this._board.movePentominoToPosition(pentomino, x, y);
            } else {
                this._board.removePentomino(pentomino);
                this._placePentominoOutsideBoard(pentomino, x, y);
            }
        } else {
            if (newPentominoPositionIsOnBoard) {
                this._removePentominoOutsideTheBoard(pentomino);
                this._board.placePentomino(pentomino, x, y);
            } else {
                this._movePentominoOutsideBoardToPosition(pentomino, x, y);
            }
        }
    }

    removePentomino(pentomino) {
        if (this._board.isPlacedOnBoard(pentomino)) {
            this._board.removePentomino(pentomino);
        } else {
            if (this.isPlacedOutsideBoard(pentomino)) {
                this._removePentominoOutsideTheBoard(pentomino);
            } else {
                throw new Error("Pentomino \'" + pentomino.name + "\' does not exist in this game.");
            }
        }
    }

    rotatePentominoClkWise(pentomino) {
        this._doLocalOperation(pentomino, p => p.rotateClkWise(), p => this._board.rotatePentominoClkWise(p));
    }

    rotatePentominoAntiClkWise(pentomino) {
        this._doLocalOperation(pentomino, p => p.rotateAntiClkWise(), p => this._board.rotatePentominoAntiClkWise(p));
    }

    mirrorPentominoH(pentomino) {
        this._doLocalOperation(pentomino, p => p.mirrorH(), p => this._board.mirrorPentominoH(p));
    }

    mirrorPentominoV(pentomino) {
        this._doLocalOperation(pentomino, p => p.mirrorV(), p => this._board.mirrorPentominoV(p));
    }

    // --- --- --- Helper Pentomino Operations --- --- ---
    _doLocalOperation(pentomino, operation, boardOperation) {
        let tempPentomino = new Pentomino(pentomino.name);
        Object.assign(tempPentomino, pentomino);
        operation(tempPentomino);

        let oldPentominoIsOnBoard = this._board.isPlacedOnBoard(pentomino);
        let position = this.getPosition(pentomino);
        let newPentominoIsOnBoard = this._board.pentominoIsValidAtPosition(tempPentomino, position[0], position[1]);

        if (oldPentominoIsOnBoard && newPentominoIsOnBoard) {
            boardOperation(pentomino);
        } else if (oldPentominoIsOnBoard && !newPentominoIsOnBoard) {
            let position = this._board.getPosition(pentomino);
            this._board.removePentomino(pentomino);
            Object.assign(pentomino, tempPentomino);
            this._placePentominoOutsideBoard(pentomino, position[0], position[1]);
        } else if (!oldPentominoIsOnBoard && !newPentominoIsOnBoard) {
            Object.assign(pentomino, tempPentomino);
        } else {
            // !oldPentominoIsOnBoard && newPentominoIsOnBoard
            this._removePentominoOutsideTheBoard(pentomino);
            Object.assign(pentomino, tempPentomino);
            this._board.placePentomino(pentomino, position[0], position[1]);
        }
    }

    _removePentominoOutsideTheBoard(pentomino) {
        this._pentominosOutside = this._pentominosOutside.filter(item => !(item.name === pentomino.name));
        this._pentominoOutsidePositions = this._pentominoOutsidePositions.filter(item => !(item.name === pentomino.name));
    }

    _placePentominoOutsideBoard(pentomino, x, y) {
        if (this.isPlacedOnBoard(pentomino)) {
            throw new Error('Pentomino \'' + pentomino.name + "\' is already in the game");
        }

        this._pentominosOutside.push(pentomino);
        this._pentominoOutsidePositions.push({
            name: pentomino.name,
            position: [x, y]
        });
    }

    _movePentominoOutsideBoardToPosition(pentomino, x, y) {
        this._pentominoOutsidePositions.forEach(pentominoPosition => {
            if (pentominoPosition.name === pentomino.name) {
                pentominoPosition.position = [x, y];
            }
        });
    }

    // --- --- --- History --- --- ---
    undo() {
        return this._commandManager.undo();
    }

    isUndoPossible() {
        return this._commandManager.isUndoPossible();
    }

    redo(command) {
        return this._commandManager.redo(command);
    }

    getPossibleRedoCommands() {
        return this._commandManager.getPossibleRedoCommands();
    }

    // --- --- --- Getter and Helper --- --- ---

    getPentominoes() {
        return this._board.getPentominoes().concat(this._pentominosOutside);
    }

    getPosition(pentomino) {
        if (this._board.isPlacedOnBoard(pentomino)) {
            return this._board.getPosition(pentomino);
        } else {
            return this._getOutsidePosition(pentomino);
        }
    }

    _getOutsidePosition(pentomino) {
        let outsidePosition = null;
        this._pentominoOutsidePositions.find((item, index) => {
            if (item.name === pentomino.name) {
                outsidePosition=item.position;
            }
        },this);
        if (outsidePosition === null) {
            throw new Error("No pentomino: " + pentomino.name + " placed outside the board");
        }
        return outsidePosition;
    }

    getPentominoesAtPosition(x, y) {
        if (this._board.positionIsValid(x, y)) {
            return this._board.getPentominoesAtPosition(x, y);
        } else {
            return this._getPentominoesOutsideAtPosition(x, y);
        }
    }

    _getPentominoesOutsideAtPosition(x, y) {
        let result = [];
        for (let i = 0; i < this._pentominosOutside.length; i++) {
            let pentominoOutside = this._pentominosOutside[i];
            if (this._isPentominoOutsideAtPosition(pentominoOutside, x, y)) {
                result.push(pentominoOutside);
            }
        }
        return result;
    }

    /**
     * Checks whether the pentomino outside the board is located at the specified position
     * @param pentomino
     * @param x
     * @param y
     * @returns {boolean}
     * @private
     */
    _isPentominoOutsideAtPosition(pentomino, x, y) {
        let pentominoPosition = this._getPentominoOutsideByName(pentomino.name);
        if (x < pentominoPosition[0]
            || x >= pentominoPosition[0] + pentomino.iCols
            || y < pentominoPosition[1]
            || y >= pentominoPosition[1] + pentomino.iRows) {
            return false;
        }

        let relXToCheck = x - pentominoPosition[0];
        let relYToCheck = y - pentominoPosition[1];

        return pentomino.sRepr.charAt(relYToCheck * pentomino.iCols + relXToCheck) === '1';
    }

    isPlacedOutsideBoard(pentomino) {
        return !(undefined === this._pentominosOutside.find(p => p.name === pentomino.name));
    }

    isPlacedOnBoard(pentomino) {
        return this._board.isPlacedOnBoard(pentomino);
    }

    isPlacedInGame(pentomino) {
        return this.isPlacedOnBoard(pentomino) || this.isPlacedOutsideBoard(pentomino);
    }

    _getPentominoOutsideByName(name) {
        for (let i = 0; i < this._pentominosOutside.length; i++) {
            let pentomino = this._pentominosOutside[i];
            if (pentomino.name === name) {
                return pentomino;
            }
        }
        throw new Error("No pentomino with name: " + name + " outside the board");
    }

    getBoardSize() {
        return [this._board._boardCols][this._board._boardRows];
    }

    // --- --- --- Debugging --- --- ---
    display() {
        this._board.display();
        console.log("");
        let string = "Pentominoes outside the board:";
        if (this._pentominosOutside.length > 0) {
            console.log(string);
            this._pentominosOutside.forEach(p => {
                let position = this._getOutsidePosition(p);
                console.log(p.name + " (" + position[0] + "," + position[1] + ")");
            });
        } else {
            string = string + " -";
            console.log(string);
        }
    }

    writeToDocument() {
        // TODO - at least name the pieces outside the board
        this._board.writeToDocument();
    }
}

if(typeof module != 'undefined') {
    module.exports = Game;
}

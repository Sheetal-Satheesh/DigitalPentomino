if(typeof require != 'undefined') {
    CommandManager = require('./command-history/command-manager.js');
    RemoveCommand = require('./command-history/commands.js');
    Pentomino = require('./pentomino');
}

class Game {
    constructor(board, name) {
        this._name = name;
        this._board = board;
        this._cmdKey = undefined;
        
        /**
            TODO: reconsider this tray, do we really need to store tray information.

            It is added to create and save all the pentomino when, game is loaded for
            the first time.
        */
        this._tray=[]; 
        this._pentominosOutside = [];
        this._pentominoOutsidePositions = [];
    }

    reset(){
        this._board.reset();
        this._tray=[];
        this._fillUpTray(); 
        this._pentominosOutside = [];
        this._pentominoOutsidePositions = [];
    }

    updateCmdKey(cmdKey){
        this._cmdKey = cmdKey;
    }
    
    /**
     * Adds new pentomino to game
     * @param pentomino
     * @param row
     * @param col
     */
    placePentomino(pentomino, row, col) {
       /**
        * Find if pentomino already placed in the board or out of the board.
        * If it is placed already in the board, and target position is not valid, 
        * then remove pentomino from the board, place out of the board
        * 
        * If it is placed already in the outside of the board, if target position
        * is valide, remove the pentomino from the outside area and place it in the
        * board
        *
        */

       let targetPosOnBoard = this._board.pentominoIsValidAtPosition(pentomino, row, col);
       if(this.isPlacedOnBoard(pentomino) ){
            if(targetPosOnBoard == true){
                this._board.placePentomino(pentomino, row, col);    
            }else{
                this.movePentominoToPosition(pentomino, row, col);
            }
        }else if(this.isPlacedOutsideBoard(pentomino)){
            if(targetPosOnBoard == false){
                this._placePentominoOutsideBoard(pentomino, row, col);
            }else{
                this.movePentominoToPosition(pentomino, row, col);
            }
        } else{
            if (targetPosOnBoard) {
                this._board.placePentomino(pentomino, row, col);
                    /**
                     * TODO: return collision information, if this piece placement make collisions
                     * with other pentomino
                    */
            } else {
                this._placePentominoOutsideBoard(pentomino, row, col);
            }
        }
    }

    /**
     * Assumes that the pentomino already exists
     * @param pentomino
     * @param row
     * @param col
     */

    movePentominoToPosition(pentomino, row, col) {
        if (!this.isPlacedInGame(pentomino)) {
            throw new Error("Pentomino \'" + pentomino.name + "\' is not placed in the game");
        }

        let oldPentominoPositionIsOnBoard = this._board.isPlacedOnBoard(pentomino);
        let newPentominoPositionIsOnBoard = this._board.pentominoIsValidAtPosition(pentomino, row, col);

        if (oldPentominoPositionIsOnBoard) {
            if (newPentominoPositionIsOnBoard) {
                this._board.movePentominoToPosition(pentomino, row, col);
            } else {
                this._board.removePentomino(pentomino);
                this._placePentominoOutsideBoard(pentomino, row, col);
            }
        } else {
            if (newPentominoPositionIsOnBoard) {
                this._removePentominoOutsideTheBoard(pentomino);
                this._board.placePentomino(pentomino, row, col);
            } else {
                this._movePentominoOutsideBoardToPosition(pentomino, row, col);
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

    _placePentominoOutsideBoard(pentomino, row, col) {
        if (this.isPlacedOnBoard(pentomino)) {
            throw new Error('Pentomino \'' + pentomino.name + "\' is already in the game");
        }

        var pentominoExist=false;
        this._pentominosOutside.find((item, index) => {
            if (item.name === pentomino.name) {
                pentominoExist = true;
                let penPosition= {
                                name: pentomino.name,
                                position: [row, col]
                               };
                this._pentominosOutside[index]=item;
                this._pentominoOutsidePositions[index] = penPosition;
            }
        },this);

        if(!pentominoExist){
            this._pentominosOutside.push(pentomino);
            this._pentominoOutsidePositions.push({
                    name: pentomino.name,
                    position: [row, col]
                });
        }
    }

    _movePentominoOutsideBoardToPosition(pentomino, row, col) {
        this._pentominoOutsidePositions.forEach(pentominoPosition => {
            if (pentominoPosition.name === pentomino.name) {
                pentominoPosition.position = [row, col];
            }
        });
    }

    _fillUpTray(){
        var allPentominos=[
                    'F','I','L','N','P','T',
                    'U','V','W','X','Y','Z'];
        allPentominos.forEach(function(pentominoType){
            let pentomino = new Pentomino(pentominoType); 
            this._tray.push(pentomino);
        },this);

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

    // --- --- --- Collision --- --- ---
    getCollisionCells(){
        return this._board.getCollisionCells();
    }

    getCollisionCellsOfPentomino(pentomino) {
        if (this.isPlacedOnBoard(pentomino)) {
            return this._board.getCollisionCellsOfPentomino(pentomino);
        } else {
            return [];
        }
    }

    getCollisionOfPentominoes(pentomino) {
        if (this.isPlacedOnBoard(pentomino)) {
            return this._board.getCollisionOfPentominoes(pentomino);
        } else {
            return [];
        }
    }
    // --- --- --- Getter and Helper --- --- ---

    getPentominoes() {
        return this._board.getPentominoes().concat(this._pentominosOutside).concat(this._tray);
    }

    getPentominoByName(name) {
        let pentominoOnBoard = this._board.getPentominoByName(name);
        if (pentominoOnBoard === null)
            return this._getPentominoOutsideByName(name);
        else
            return pentominoOnBoard;
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
            //throw new Error("No pentomino: " + pentomino.name + " placed outside the board");
            console.info(
                            "Pentomino" + 
                             pentomino.name+ 
                            " not in the Game area, Is it in Tray?");
            
            return undefined;
        }
        return outsidePosition;
    }

    getPentominoesAtPosition(row, col) {
        if (this._board.positionIsValid(row, col)) {
            return this._board.getPentominoesAtPosition(row, col);
        } else {
            return this._getPentominoesOutsideAtPosition(row, col);
        }
    }

    _getPentominoesOutsideAtPosition(row, col) {
        let result = [];
        for (let i = 0; i < this._pentominosOutside.length; i++) {
            let pentominoOutside = this._pentominosOutside[i];
            if (this._isPentominoOutsideAtPosition(pentominoOutside, row, col)) {
                result.push(pentominoOutside);
            }
        }
        return result;
    }

    /**
     * Checks whether the pentomino outside the board is located at the specified position
     * @param pentomino
     * @param row
     * @param col
     * @returns {boolean}
     * @private
     */
    _isPentominoOutsideAtPosition(pentomino, row, col) {
        let pentominoPosition = this._getPentominoOutsideByName(pentomino.name);
        if (pentominoPosition === null) {
            throw new Error("No pentomino with name '" + pentomino.name + "' found outside the board");
        }

        if (row < pentominoPosition[0]
            || row >= pentominoPosition[0] + pentomino.iRows
            || col < pentominoPosition[1]
            || col >= pentominoPosition[1] + pentomino.iCols) {
            return false;
        }

        let relRowToCheck = row - pentominoPosition[0];
        let relColToCheck = col - pentominoPosition[1];

        return pentomino.sRepr.charAt(relRowToCheck * pentomino.iCols + relColToCheck) === '1';
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
        return null;
    }

    getBoardSize() {
        return [this._board._boardRows,this._board._boardCols];
    }

    getName() {
        return this._name;
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
                console.log(p.name + " [" + position[0] + "," + position[1] + "]");
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

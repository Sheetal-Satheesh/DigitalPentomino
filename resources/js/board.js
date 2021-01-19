const EMPTY_CELL = ' ';

class Board {
    /**
     * It will create a default board of the defined size.
     *
     * The board class follows the following assumptions:
     *
     * - Multiple instances of the same piece inside the same board are not allowed
     * - Collisions inside the board are not allowed
     * - Only pieces can be placed, which fit exactly onto the board. That means that only those pieces are counted for collisions. All other pieces are saved in the game-object and are ignored on collisions. That means that they may overlap on the board on the frontend, but are treated as non-existing in the Board class.
     *
     * @constructor
     * @param boardX;
     * @param boardY; 
     * @param shape; shape of the block
     */
    constructor(boardCols,boardRows,shape='Block') {
        this._boardCols = boardCols;
        this._boardRows = boardRows;

        this._pentominoes = [];
        this._pentominoPositions = [];
    }

    placePentomino(pentomino, x, y) {
        if (!this.pentominoIsValidAtPosition(pentomino, x, y)) {
            if (!this.positionIsValid(x, y)) {
                throw new Error("Position (" + x + "," + y + ") is outside the board");
            } else {
                throw new Error("Pentomino" + pentomino.name + "does not fit at position (" + x + "," + y + ") on the board");
            }
        }

        if (this.isPlacedOnBoard(pentomino)) {
            throw new Error('Pentomino \'' + pentomino.name + "\' is already on the board");
        }

        this._pentominoes.push(pentomino);

        this._pentominoPositions.push({
            name:pentomino.name,
            boardPosition:[x,y]
        });

        // TODO - collisions
    }

    /**
     * Places a new or already existing pentomino piece on the board if there is no collision
     * @param pentomino the piece that should be placed
     * @param x new x position
     * @param y new y position
     * @throws Error if new position is outside the board
     * @returns {boolean} returns false if a collision occurred else true
     */
    movePentominoToPosition(pentomino, x, y) {
        if (!this.pentominoIsValidAtPosition(pentomino, x, y)) {
            if (!this.positionIsValid(x, y)) {
                throw new Error("Position (" + x + "," + y + ") is outside the board");
            } else {
                throw new Error("Pentomino" + pentomino.name + "does not fit at position (" + x + "," + y + ") on the board");
            }
        }

        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino \'" + pentomino.name + "\' does not exist on the board");
        }

        this._pentominoPositions = this._pentominoPositions.filter(
            item =>item.name !== pentomino.name);

        this._pentominoPositions.push({
            name:pentomino.name,
            boardPosition:[x,y]
        });

        // TODO - collisions
    }

    rotatePentominoAntiClkWise(pentomino) {
        this._doLocalOperationOnPentomino(pentomino, "rotateAntiClkWise", (p) => p.rotateAntiClkWise());
    }

    rotatePentominoClkWise(pentomino) {
        this._doLocalOperationOnPentomino(pentomino, "rotateClkWise", (p) => p.rotateClkWise());
    }

    mirrorPentominoH(pentomino) {
        this._doLocalOperationOnPentomino(pentomino, "mirrorV", (p) => p.mirrorH());
    }

    mirrorPentominoV(pentomino) {
        this._doLocalOperationOnPentomino(pentomino, "mirrorV", (p) => p.mirrorV());
    }

    /**
     * Do a local operation, meaning a operation that does not change the position of the pentomino.
     * @param pentomino
     * @param operationName
     * @param operation
     */
    _doLocalOperationOnPentomino(pentomino, operationName, operation) {
        let tempPentomino = new Pentomino(pentomino.name);
        Object.assign(tempPentomino, pentomino);
        operation(tempPentomino);
        let position = this.getPosition(pentomino);

        if (!this.pentominoIsValid(tempPentomino)) {
            throw new Error("Pentomino" + pentomino.name + "does not fit at position (" + position[0] + "," + position[1] + ") " +
                "after operation" + operationName);
        }
        Object.assign(pentomino, tempPentomino);

        // TODO - collisions
    }

    /**
     * Removes a pentomino piece from the board
     * @param pentomino the piece that should be removed
     * @throws {Error} if the pentomino is not placed on the board
     */
    removePentomino(pentomino) {
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino with name '" + pentomino.name + "' is not placed on the board.");
        }

        this._pentominoPositions = this._pentominoPositions.filter(
                                            item =>item.name !== pentomino.name);
        this._pentominoes = this._pentominoes.filter(
                                            item =>item.name !== pentomino.name);

    }
    /**
    _arraynother pentomino at the specified position
     * @param pentomino
     * @param x new x position
     * @param y new y position
     * @throws {Error} if new position is outside the board
     * @returns {boolean}
     */
    isCollides(pentomino, x, y) {
        if (!this.pentominoIsValidAtPosition(pentomino, x, y)) {
            if (!this.positionIsValid(x, y)) {
                throw new Error("Position (" + x + "," + y + ") is outside the board");
            } else {
                throw new Error("Pentomino" + pentomino.name + "does not fit at position (" + x + "," + y + ") on the board");
            }
        }

        /**
         * we have new strategy for collision and internal structure changed,
         * also removed harding binding with array.
         * TODO: Merge with pen-collision-asu branch
         */
         
         /*for (let i = 0; i < pentomino.iRows; i++) {
            for (let j = 0; j < pentomino.iCols; j++) {
                if (pentomino.sRepr.charAt(i * pentomino.iCols + j) === '1'
                    && !(this._array[x + i][y + j] === EMPTY_CELL)
                    && !(this._array[x + i][y + j] === pentomino.name)) {
                    return true;
                }
            }
        }
        */

        return false;
    }

    // --- --- --- Getter And Helper --- --- ---
    /**
     * Returns whether the pentomino piece is placed on the board
     * @param pentomino
     * @returns {boolean}
     */
    isPlacedOnBoard(pentomino) {
        return !(this._pentominoes.find(p => p.name === pentomino.name) === undefined);
    }

    /**
     * Get cached position of pentomino inside the board
     * @param pentomino
     * @throws {Error} if pentomino is not placed on the board
     * @returns {Array} [x,y]
     */
    getPosition(pentomino) {
        let boardPosition = null;
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("No pentomino: " + pentomino.name + " placed on the board");
        } else {
            this._pentominoPositions.find((item, index) => {
                if (item.name === pentomino.name) {
                    boardPosition=item.boardPosition;
                }
            },this);
        }

        return boardPosition;
    }

    /**
     * Get pentomino object by name
     * @param name
     * @throws {Error} if no pentomino with this name is placed on the board
     * @returns pentomino
     */
    getPentominoByName(name) {
        for (let i = 0; i < this._pentominoes.length; i++) {
            let pentomino = this._pentominoes[i];
            if (pentomino.name === name) {
                return pentomino;
            }
        }
        throw new Error("No pentomino with name: " + name + " on the board");
    }

    /**
     * Get pentomino at the specified position
     * @param x
     * @param y
     * @throws {Error} if the position is outside the board or if there is no pentomino at this position of the board
     * @returns {Pentomino}
     */
    getPentominoesWithPosition(x, y) {
        // FIXME - return list of all pentominoes with this position
        if (!this.positionIsValid(x, y)) {
            throw new Error("Position (" + x + "," + y + ") is outside the board");
        }

        let pentomino=undefined;
        this._pentominoPositions.forEach(function(item){    
            if(item.boardPosition[0] === x && item.boardPosition[1] === y){
                pentomino=this.getPentominoByName(item.name);
            }
        },this);
        if(pentomino === undefined){
            throw new Error("No pentomino at position (" + x + ", " + y + ")");
        }else{
            return pentomino;
        }
    }

    /**
     * Returns an array of all pentomino pieces occupying this cell
     * @param x
     * @param y
     * @returns {Array}
     */
    getPentominoesAtPosition(x, y) {
        if (!this.positionIsValid(x, y)) {
            throw new Error("Position (" + x + "," + y + ") is outside the board");
        }

        let result = [];
        for (let i = 0; i < this._pentominoes.length; i++) {
            let pentomino = this._pentominoes[i];
            let position = this.getPosition(pentomino);

            let matrixPosition = pentomino.getMatrixPosition(position, [x, y]);

            if (pentomino.matrixPositionIsValid(matrixPosition[0], matrixPosition[1])
                && pentomino.getCharAtMatrixPosition(matrixPosition[0], matrixPosition[1]) === '1') {
                result.push(pentomino);
            }
        }
        return result;
    }

    /**
     * Returns whether the position is inside the board
     * @param x
     * @param y
     * @returns {boolean}
     */
    positionIsValid(x, y) {
        x=parseInt(x);
        y=parseInt(y);
        return !(x < 0
            || x >= this._boardCols
            || y < 0
            || y >= this._boardRows);
    }

    /** Returns whether the pentomino will fit onto the board at the specified position
     *
     * @param pentomino
     * @param anchorX position to check
     * @param anchorY position to check
     * @returns {boolean}
     */
    pentominoIsValidAtPosition(pentomino, anchorX, anchorY) {
        for (let y = 0; y < pentomino.iRows; y++) {
            for (let x = 0; x < pentomino.iCols; x++) {
                if (pentomino.getCharAtMatrixPosition(x, y) === '1') {
                    let coordinatePosition = pentomino.getCoordinatePosition([anchorX, anchorY], [x, y]);
                    if (!this.positionIsValid(coordinatePosition[0], coordinatePosition[1])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    pentominoIsValid(pentomino) {
        let position = this.getPosition(pentomino);
        return this.pentominoIsValidAtPosition(pentomino, position[0], position[1]);
    }

    /**
     * Returns all pentomino objects that are currently placed on the board
     * @returns {Array}
     */
    getPentominoes() {
        return this._pentominoes;
    }

    // --- --- -- Debugging --- --- ---
    /**
     * Prints board on html document for debugging purposes.
     */
    writeToDocument() {
        // FIXME
        /*const penColor = Object.freeze({"N":'blue',
                                        "P":'Gainsboro',
                                        "T":'Teal',
                                        "L":'Fuchsia',
                                        "W":'Aqua',
                                        "X":'LightSteelBlue',
                                        "U":'Lime',
                                        "F":'Olive',
                                        "Z":'Maroon',
                                        "I":'AliceBlue',
                                        "V":'Aquamarine',
                                        'Y':"PaleGreen"
                                    });
        var body = document.getElementsByTagName('body')[0];
        var boardTB = document.createElement('table');
        var bBody = document.createElement('tbody');
        
        boardTB.style.width = '30%';
        boardTB.setAttribute('border', '1');
        boardTB.setAttribute('align', 'center');   

        for (var i = 0; i < this._boardColls; i++) {
          var rows = document.createElement('tr');
          for (var j = 0; j < this._boardRows; j++) {
              var cells = document.createElement('td');
              cells.appendChild(document.createTextNode('-'));
              rows.appendChild(cells)
            }
            bBody.appendChild(rows);
          }
          
        boardTB.appendChild(bBody);
        body.appendChild(boardTB);
        
        this._pentominoes.forEach(function(pentomino){
            let [bx,by] = this.getPosition(pentomino);
            for(let x = bx; x < pentomino.iRows+bx; ++x){
                let cells = boardTB.rows.item(x).cells;

                for(let y=by; y < pentomino.iCols+by; ++y){
                    if(pentomino.sRepr.charAt(
                        ((x-bx+pentomino.sX)>0?(x-bx+pentomino.sX):(bx-x-pentomino.sX)) *
                        I_COLS +
                        ((y-by+pentomino.sY)>0?(y-by+pentomino.sY):(by-y+pentomino.sY)) ) === '1'){
                        if(cells.item(y).innerHTML === '-'){
                            cells.item(y).innerHTML=pentomino.name;
                            cells.item(y).style.backgroundColor = penColor[pentomino.name];
                        }else{
                            cells.item(y).innerHTML = pentomino.name+','+cells.item(y).innerHTML;
                            cells.item(y).style.backgroundColor = 'red';
                        }
                    }                    
                }
            }

        },this);
*/
    }
    
    /**
     * Prints board to console for debugging purposes.
     */
    displayTable() {
        // FIXME
        /*var board =  [];
        for(let i=0; i<this._boardColls; ++i){
            board.push(Array(this._boardRows).fill('-'));
        }
        this._pentominoes.forEach(function(pentomino){
            let [bx,by] = this.getPosition(pentomino);
            for(let x =0; x < I_ROWS; ++x){
                for(let y=0; y < I_COLS; ++y){

                    if(pentomino.sRepr.charAt(x * I_COLS + y) === '1'){
                        if(board[bx+x-pentomino.sX][by+y-pentomino.sY] === '-'){
                            board[bx+x-pentomino.sX][by+y-pentomino.sY]= pentomino.name;
                        }else{
                            board[bx+x-pentomino.sX][by+y-pentomino.sY] = 
                                    board[bx+x-pentomino.sX][by+y-pentomino.sY] +','+pentomino.name;
                        }
                    }                    
                }
            }

        },this);
       console.table(board);
         */
    }

    display() {
        let board = [];
        for (let i=0; i<this._boardCols; ++i) {
            board.push(Array(this._boardRows).fill('-'));
        }
        this._pentominoes.forEach(function(pentomino) {
            let [anchorX,anchorY] = this.getPosition(pentomino);
            for (let relY = 0; relY < pentomino.iRows; ++relY) {
                for (let relX = 0; relX < pentomino.iCols; ++relX) {
                    if (pentomino.getCharAtMatrixPosition(relX, relY) === '1') {
                        let coordinatePosition = pentomino.getCoordinatePosition([anchorX, anchorY], [relX, relY]);
                        if (board[coordinatePosition[0]][coordinatePosition[1]] === '-') {
                            board[coordinatePosition[0]][coordinatePosition[1]] = pentomino.name;
                        } else {
                            board[coordinatePosition[0]][coordinatePosition[1]] = board[coordinatePosition[0]][coordinatePosition[1]] + ',' + pentomino.name;
                        }
                    }
                }
            }

        },this);

        let string = '   ';
        for (let i = 0; i < board[0].length; i++) {
            string = string + i + ' ';
        }
        console.log(string);
        for (let y = 0; y < this._boardRows; ++y) {
            string = y + '|';
            for (let x = 0; x < this._boardCols; ++x) {
                string = string + ' ';
                string = string + board[x][y];
            }
            string = string + ' |';
            console.log(string);
        }
    }
}

if(typeof module != 'undefined') {
    module.exports = Board;
}

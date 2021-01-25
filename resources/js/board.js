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
     * @param boardRows;
     * @param boardCols;
     * @param shape; shape of the block
     */
    constructor(boardStartXY, boardSizeXY,boardShape='Block') {
        this._boardSRows = boardStartXY[0]??0;
        this._boardSCols = boardStartXY[1]??0;

        this._boardRows = boardSizeXY[0];
        this._boardCols = boardSizeXY[1];

        this._pentominoes = [];
        this._pentominoPositions = [];
        this._collisions = [];
    }

    placePentomino(pentomino, row, col) {

        /**
         * Do we need that checking really? Is it not duplcate operation? Game class
         * already not decided this pentomino should placed on the board?
         */
        if (!this.pentominoIsValidAtPosition(pentomino, row, col)) {
            if (!this.positionIsValid(row, col)) {
                throw new Error("Position [" + row + "," + col + "] is outside the board");
            } else {
                throw new Error("Pentomino" + pentomino.name + " does not fit at position [" + row + "," + col + "] on the board");
            }
        }

        if (this.isPlacedOnBoard(pentomino)) {
            /**
             * This function will be called after checking that this pentomino is a valid
             * candidate for placing on board, if this piece already placed, then move
             * operation should be called.
             *
             * return from here
             */
            this.movePentominoToPosition(pentomino, row, col);
        }else{

            this._pentominoes.push(pentomino);
            this._pentominoPositions.push({
                name:pentomino.name,
                boardPosition:[row,col]
            });

            let collisonCells=[];
            if (this.isCollidesAtPosition(pentomino, row, col,collisonCells)) {
                this.setCollisionCells(collisonCells);
            }
        }

    }

    /**
     * Places a new or already existing pentomino piece on the board if there is no collision
     * @param pentomino the piece that should be placed
     * @param row new row position
     * @param col new col position
     * @throws Error if new position is outside the board
     * @returns {boolean} returns false if a collision occurred else true
     */
    movePentominoToPosition(pentomino, row, col) {
        if (!this.pentominoIsValidAtPosition(pentomino, row, col)) {
            if (!this.positionIsValid(row, col)) {
                throw new Error("Position [" + row + "," + col + "] is outside the board");
            } else {
                throw new Error("Pentomino" + pentomino.name + " does not fit at position [" + row + "," + col + "] on the board");
            }
        }

        /**
         * movePentomino always triggered by placePentomino() function, when placePentomino()
         * find that a piece already placed on the board, then it will call this function. 
         * 
         * Do we need that checking?
         * 
         */
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino \'" + pentomino.name + "\' does not exist on the board");
        }

        this._pentominoPositions = this._pentominoPositions.filter(
            item =>item.name !== pentomino.name);

        this._pentominoPositions.push({
            name:pentomino.name,
            boardPosition:[row,col]
        });

        let collisonCells=[];
        if (this.isCollidesAtPosition(pentomino, row, col,collisonCells)) {
            this.setCollisionCells(collisonCells);
        }
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
            throw new Error("Pentomino" + pentomino.name + "does not fit at position [" + position[0] + "," + position[1] + "] " +
                "after operation" + operationName);
        }
        Object.assign(pentomino, tempPentomino);

        let collisonCells=[];
        if (this.isCollidesAtPosition(pentomino, position[0], position[1],collisonCells)) {
            this.setCollisionCells(collisonCells);
        }
    }

    /**
     * Removes a pentomino piece from the board
     * @param pentomino the piece that should be removed
     * @throws {Error} if the pentomino is not placed on the board
     * 
     */
    removePentomino(pentomino) {
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino with name '" + pentomino.name + "' is not placed on the board.");
        }

        this.removeCollisionByPentomino(pentomino);
        this._pentominoPositions = this._pentominoPositions.filter(
                                            item =>item.name !== pentomino.name);
        this._pentominoes = this._pentominoes.filter(
                                            item =>item.name !== pentomino.name);

    }

    // --- --- --- Collisions --- --- ---
    /**
    _arraynother pentomino at the specified position
     * @param pentomino
     * @param row new row position
     * @param col new col position
     * @throws {Error} if new position is outside the board
     * @returns {boolean}
     */
    isCollidesAtPosition(pentomino, row, col, collisionsCell=[]) {
        let verdict = false;

        if (!this.pentominoIsValidAtPosition(pentomino, row, col)) {
            if (!this.positionIsValid(row, col)) {
                throw new Error("Position [" + row + "," + col + "] is outside the board");
            } else {
                throw new Error("Pentomino \'" + pentomino.name + "\' does not fit at position [" + row + "," + col + "] on the board");
            }
        }

        this._pentominoes.forEach(function(entry){
            if(pentomino.name === entry.name){/** if same pentomino placed again */
                return verdict;
            }
            if(this.doPentominoMatricesOverlapAtPosition(row,col, pentomino, entry)){
                let entryPosition = this.getPosition(entry);
                let pentominoPosition = [row, col];
                let overlapCells = this.getOverlappingCells(row,col,pentomino,entry);

                for (let i=0; i < overlapCells.length;++i) {
                    let cell = overlapCells[i];
                    let pOverlapCellMatrixPos = pentomino.getMatrixPosition(pentominoPosition, [cell.x, cell.y]);
                    let pValue = pentomino.getCharAtMatrixPosition(pOverlapCellMatrixPos[0], pOverlapCellMatrixPos[1]);
                    let eOverlapCellMatrixPos = entry.getMatrixPosition(entryPosition, [cell.x, cell.y]);
                    let eValue = entry.getCharAtMatrixPosition(eOverlapCellMatrixPos[0], eOverlapCellMatrixPos[1]);
                    if(eValue === '1' && pValue === eValue) {
                        verdict=true;
                        let index = collisionsCell.findIndex(item => item.cell[0] === cell.x &&
                            item.cell[1] === cell.y);
                        if (index === -1) {
                            collisionsCell.push({
                                'cell':[cell.x,cell.y],
                                'pentominos':[pentomino.name,entry.name]
                            });
                        } else {
                            collisionsCell[index].pentominos.push(pentomino.name);
                        }
                    }
                }
            }
        },this);

        return verdict;
    }

    /**
     * Returns whether matrices of the specified pentominoes overlap at the specified position
     * @param row
     * @param col
     * @param pentominoA
     * @param pentominoB
     * @returns {boolean}
     */
    doPentominoMatricesOverlapAtPosition(row, col, pentominoA, pentominoB) {

        let aLowestRow = row - pentominoA.rowAnchor;
        let aHighestCol = col + pentominoA.colAnchor;
        let aHighestRow = row + pentominoA.rowAnchor;
        let aLowestCol = col - pentominoA.colAnchor;

        let [p1, q1] = this.getPosition(pentominoB);
        let bLowestRow = p1 - pentominoB.rowAnchor;
        let bHighestRow = p1 + pentominoB.rowAnchor;
        let bLowestCol = q1 - pentominoB.rowAnchor;
        let bHighestCol = q1 + pentominoB.colAnchor;

        return (Math.max(aLowestRow, bLowestRow) <= Math.min(aHighestRow, bHighestRow)
            && Math.max(aLowestCol, bLowestCol) <= Math.min(aHighestCol, bHighestCol));
    }

    getOverlappingCells(row, col, pentominoA, pentominoB){
        let cells = [];

        let aLowestRow = row - pentominoA.rowAnchor;
        let aHighestCol = col + pentominoA.colAnchor;
        let aHighestRow = row + pentominoA.rowAnchor;
        let aLowestCol = col - pentominoA.colAnchor;

        let [p1, q1] = this.getPosition(pentominoB);
        let bLowestRow = p1 - pentominoB.rowAnchor;
        let bHighestRow = p1 + pentominoB.rowAnchor;
        let bLowestCol = q1 - pentominoB.colAnchor;
        let bHighestCol = q1 + pentominoB.colAnchor;

        let bottomRow   = Math.max(aLowestRow, bLowestRow);
        let topRow      = Math.min(aHighestRow, bHighestRow);
        let leftCol     = Math.max(aLowestCol, bLowestCol);
        let rightCol    = Math.min(aHighestCol, bHighestCol);

        for(let i=bottomRow; i <= topRow; ++i){
            for(let j=leftCol; j <= rightCol; ++j){
                cells.push({
                    'x':i,
                    'y':j
                });
            }
        }

        return cells;
    }

    setCollisionCells(collisionCells){
        if(this._collisions.length === 0){
            this._collisions.push(...collisionCells);
        }else{
            collisionCells.forEach(function(element){
                let index = this._collisions.findIndex(item => item.cell[0] === element.cell[0] &&
                    item.cell[1] === element.cell[1]);
                if (index === -1) {
                    this._collisions.push({
                        'cell':element.cell,
                        'pentominos':element.pentominos
                    });
                }else {
                    this._collisions[index].pentominos = [...new Set([...this._collisions[index].pentominos,
                        ...element.pentominos])];
                }
            },this);
        }
    }

    removeCollisionByCells(cells){
        this._collisions = this._collisions.map((cItem, index)=>{
            if(cItem.cell[0] == cells[0] && cItem.cell[1] == cells[1]){
                this._collisions = this._collisions.filter(
                    item => (item.cell[0] != cItem.cell[0]) && 
                            (item.cell[0] != cItem.cell[1]) 
                             );
            }else{
                return cItem;
            }
        },this);

    }

    removeCollisionByPentomino(pentomino){
        this._collisions = this._collisions.map((cItem, index)=>{
            cItem.pentominos =  cItem.pentominos.filter(
                                        item =>item !== pentomino.name);
            if(cItem.pentominos.length == 1){
                this._collisions = this._collisions.filter(
                        item => (item.cell[0] != cItem.cell[0]) && 
                                (item.cell[1] != cItem.cell[1])
                                 );
            }else{
                    return cItem;
            }
        },this);

    }

    getCollisionCells(){
        return this._collisions;
    }

    getCollisionCellsOfPentomino(pentomino) {
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino with name '" + pentomino.name + "' is not placed on the board." +
                "Collisions are only detected for pentominoes on the board.");
        }
        return this._collisions.filter(collision => {
            let p1Name = collision.pentominos[0];
            let p2Name = collision.pentominos[1];
            return p1Name === pentomino.name || p2Name === pentomino.name;
        });
    }

    getCollisionPentominoesOfPentomino(pentomino) {
        if (!this.isPlacedOnBoard(pentomino)) {
            throw new Error("Pentomino with name '" + pentomino.name + "' is not placed on the board." +
                "Collisions are only detected for pentominoes on the board.");
        }
        let allCollisions = this.getCollisionCellsOfPentomino(pentomino);
        let resultWithDuplicates = allCollisions.map(collision => {
            let p1Name = collision.pentominos[0];
            let p2Name = collision.pentominos[1];
            return p1Name === pentomino.name ? this.getPentominoByName(p2Name) : this.getPentominoByName(p1Name);
        });
        return [...new Set(resultWithDuplicates)];
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
     * @param row
     * @param col
     * @throws {Error} if the position is outside the board or if there is no pentomino at this position of the board
     * @returns {Pentomino}
     */
    getPentominoesWithPosition(row, col) {
        // FIXME - return list of all pentominoes with this position
        if (!this.positionIsValid(row, col)) {
            throw new Error("Position [" + row + "," + col + "] is outside the board");
        }

        let pentomino=undefined;
        this._pentominoPositions.forEach(function(item){    
            if(item.boardPosition[0] === row && item.boardPosition[1] === col){
                pentomino=this.getPentominoByName(item.name);
            }
        },this);
        if(pentomino === undefined){
            throw new Error("No pentomino at position [" + row + ", " + col + "]");
        }else{
            return pentomino;
        }
    }

    /**
     * Returns an array of all pentomino pieces occupying this cell
     * @param row
     * @param col
     * @returns {Array}
     */
    getPentominoesAtPosition(row, col) {
        if (!this.positionIsValid(row, col)) {
            throw new Error("Position [" + row + "," + col + "] is outside the board");
        }

        let result = [];
        for (let i = 0; i < this._pentominoes.length; i++) {
            let pentomino = this._pentominoes[i];
            let position = this.getPosition(pentomino);

            let matrixPosition = pentomino.getMatrixPosition(position, [row, col]);

            if (pentomino.matrixPositionIsValid(matrixPosition[0], matrixPosition[1])
                && pentomino.getCharAtMatrixPosition(matrixPosition[0], matrixPosition[1]) === '1') {
                result.push(pentomino);
            }
        }
        return result;
    }

    /**
     * Returns whether the position is inside the board
     * @param row
     * @param col
     * @returns {boolean}
     */
    positionIsValid(row, col) {

        row=parseInt(row);
        col=parseInt(col);

        return  !(
            (row < this._boardSRows)
            || (row >= (this._boardRows+ this._boardSRows))
            || (col < this._boardSCols)
            || (col >= (this._boardCols+this._boardSCols))
            );
    }

    /** Returns whether the pentomino will fit onto the board at the specified position
     *
     * @param pentomino
     * @param anchorRow position to check
     * @param anchorCol position to check
     * @returns {boolean}
     */
    pentominoIsValidAtPosition(pentomino, anchorRow, anchorCol) {
        for (let row = 0; row < pentomino.iRows; row++) {
            for (let col = 0; col < pentomino.iCols; col++) {
                if (pentomino.getCharAtMatrixPosition(row, col) === '1') {
                    let coordinatePosition = pentomino.getCoordinatePosition([anchorRow, anchorCol], [row, col]);
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
        for (let i=0; i<this._boardRows; ++i) {
            board.push(Array(this._boardCols).fill('-'));
        }
        this._pentominoes.forEach(function(pentomino) {
            let [anchorRow,anchorCol] = this.getPosition(pentomino);
            for (let relRow = 0; relRow < pentomino.iRows; ++relRow) {
                for (let relCol = 0; relCol < pentomino.iCols; ++relCol) {
                    if (pentomino.getCharAtMatrixPosition(relRow, relCol) === '1') {
                        let coordinatePosition = pentomino.getCoordinatePosition([anchorRow, anchorCol], [relRow, relCol]);
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
        for (let row = 0; row < this._boardRows; ++row) {
            string = row + '|';
            for (let col = 0; col < this._boardCols; ++col) {
                string = string + ' ';
                string = string + board[row][col];
            }
            string = string + ' |';
            console.log(string);
        }
    }
}

if(typeof module != 'undefined') {
    module.exports = Board;
}

const EMPTY_CELL = 'O';

/**
 * It will create a default board of the defined size.
 * @constructor
 * @param size {Array} [width,height]
 */
function Board(size) {
    this.size = size;

    this.pentominos = [];
    this.pentominoPositions = {};

    this.array = [];
    let width = size[0];
    let height = size[1];
    for (let i = 0; i < width; i++) {
        let col = [];
        for (let j = 0; j < height; j++) {
            col.push(EMPTY_CELL);
        }

        this.array.push(col);
    }
}

/**
 * Prints board on html document for debugging purposes.
 */
Board.prototype.display = function() {
    document.write("Board:<br>");
    for (let y = 0; y < this.size[1]; y++) {
        document.write("|");
        for (let x = 0; x < this.size[0]; x++) {
            document.write(this.array[x][y]);
        }
        document.write("|<br>");
    }
}

/**
 * Places a new or already existing pentomino piece on the board
 * @param x new x position
 * @param y new y position
 * @param pentomino the piece that should be placed
 * @returns {string|null} returns null if collision occurred or else a string of the occupied cells
 */
Board.prototype.placePentomino = function(x, y, pentomino) {
    if (this.isCollides(x, y, pentomino)) {
        return null;
    }

    if (!this.contains(pentomino.name)) {
        this.pentominos.push(pentomino);
    }
    this.pentominoPositions[pentomino.name] = [x, y];

    for (let i = 0; i < pentomino.height; i++) {
        for (let j = 0; j < pentomino.width; j++) {
            if (pentomino.occupied_cells.charAt(i * pentomino.width + j) === '1') {
                this.array[x + j][y + i] = pentomino.name;
            }
        }
    }

    return pentomino.occupied_cells;// TODO - return as two dimensional array or maybe in GameController?
}

Board.prototype.isCollides = function (x, y, pentomino) {
    // TODO - return true or false

    return false;
}

Board.prototype.contains = function (name) {
    for (let i = 0; i < this.pentominos.length; i++) {
        let pentomino = this.pentominos[i];
        if (pentomino.name === name) return true;
    }
    return false;
}

Board.prototype.removePentomino = function(x, y, pentomino) {
    // TODO
}

/**
 * Get cached position of pentomino inside the board
 * @param pentomino
 * @throws {Error} if pentomino is not placed on the board
 * @returns {Array} [x,y]
 */
Board.prototype.getPosition = function(pentomino) {
    if (!this.pentominoPositions.hasOwnProperty(pentomino.name)) {
        throw new Error("No pentomino: " + pentomino.name + " placed on the board");
    } else {
        return this.pentominoPositions[pentomino.name];
    }
}

/**
 * Get pentomino object by name
 * @param name
 * @throws {Error} if no pentomino with this name is placed on the board
 * @returns pentomino
 */
Board.prototype.getPentominoByName = function (name) {
    for (let i = 0; i < this.pentominos.length; i++) {
        let pentomino = this.pentominos[i];
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
 * @throws {Error} if there is no pentomino at this position of the board
 * @returns {pentomino}
 */
Board.prototype.getPentominoAtPosition = function(x, y) {
    if (this.array[x][y] === EMPTY_CELL) {
        throw new Error("No pentomino at position (" + x + ", " + y + ")");
    } else {
        let name = this.array[x][y];
        return this.getPentominoByName(name);
    }
}

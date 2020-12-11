const EMPTY_CELL = 'O';

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
 * @param size {Array} [width,height]
 */
function Board(size) {
    this.size = size;

    this._pentominos = [];
    this._pentominoPositions = {};

    this._array = [];
    let width = size[0];
    let height = size[1];
    for (let i = 0; i < width; i++) {
        let col = [];
        for (let j = 0; j < height; j++) {
            col.push(EMPTY_CELL);
        }

        this._array.push(col);
    }
}

/**
 * Places a new or already existing pentomino piece on the board if there is no collision
 * @param pentomino the piece that should be placed
 * @param x new x position
 * @param y new y position
 * @throws Error if new position is outside the board
 * @returns {boolean} returns false if a collision occurred else true
 */
Board.prototype.placePentomino = function(pentomino, x, y) {
    if (!this.pentominoPositionIsValid(pentomino, x, y)) {
        if (!this.positionIsValid(x, y)) {
            throw new Error("Position (" + x + "," + y + ") is outside the board");
        } else {
            throw new Error("Pentomino" + pentomino.name + "doesn not fit at position (" + x + "," + y + ") on the board");
        }
    }

    if (this.isCollides(pentomino, x, y)) {
        return false;
    }

    if (this.isPlacedOnBoard(pentomino)) {
        // remove from array
        this._drawPentomino(pentomino, EMPTY_CELL);
    } else {
        this._pentominos.push(pentomino);
    }

    this._pentominoPositions[pentomino.name] = [x, y];
    this._drawPentomino(pentomino, pentomino.name);

    return true;
}

/**
 * Removes a pentomino piece from the board
 * @param pentomino the piece that should be removed
 * @throws {Error} if the pentomino is not placed on the board
 */
Board.prototype.removePentomino = function(pentomino) {
    if (!this.isPlacedOnBoard(pentomino)) {
        throw new Error("Pentomino with name '" + pentomino.name + "' is not placed on the board.");
    }

    this._drawPentomino(pentomino, EMPTY_CELL);
    delete this._pentominoPositions[pentomino.name];
    delete this._pentominos[pentomino.name];
}

/**
 * Returns whether the pentomino collides with another pentomino at the specified position
 * @param pentomino
 * @param x new x position
 * @param y new y position
 * @throws {Error} if new position is outside the board
 * @returns {boolean}
 */
Board.prototype.isCollides = function (pentomino, x, y) {
    if (!this.pentominoPositionIsValid(pentomino, x, y)) {
        if (!this.positionIsValid(x, y)) {
            throw new Error("Position (" + x + "," + y + ") is outside the board");
        } else {
            throw new Error("Pentomino" + pentomino.name + "doesn not fit at position (" + x + "," + y + ") on the board");
        }
    }

    for (let i = 0; i < pentomino.height; i++) {
        for (let j = 0; j < pentomino.width; j++) {
            if (pentomino.occupied_cells.charAt(i * pentomino.width + j) === '1'
                && !(this._array[x + j][y + i] === EMPTY_CELL)
                && !(this._array[x + j][y + i] === pentomino.name)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Draws a char on every occupied cell of the pentomino
 * @param pentomino
 * @param charToDraw
 */
Board.prototype._drawPentomino = function (pentomino, charToDraw) {
    let position = this.getPosition(pentomino);
    let x = position[0];
    let y = position[1];
    for (let i = 0; i < pentomino.height; i++) {
        for (let j = 0; j < pentomino.width; j++) {
            if (pentomino.occupied_cells.charAt(i * pentomino.width + j) === '1') {
                this._array[x + j][y + i] = charToDraw;
            }
        }
    }
}

// --- --- --- Getter And Helper --- --- ---
/**
 * Returns whether the pentomino piece is placed on the board
 * @param pentomino
 * @returns {boolean}
 */
Board.prototype.isPlacedOnBoard = function (pentomino) {
    return this._pentominoPositions.hasOwnProperty(pentomino.name);
}

/**
 * Get cached position of pentomino inside the board
 * @param pentomino
 * @throws {Error} if pentomino is not placed on the board
 * @returns {Array} [x,y]
 */
Board.prototype.getPosition = function(pentomino) {
    if (!this.isPlacedOnBoard(pentomino)) {
        throw new Error("No pentomino: " + pentomino.name + " placed on the board");
    } else {
        return this._pentominoPositions[pentomino.name];
    }
}

/**
 * Get pentomino object by name
 * @param name
 * @throws {Error} if no pentomino with this name is placed on the board
 * @returns pentomino
 */
Board.prototype.getPentominoByName = function (name) {
    for (let i = 0; i < this._pentominos.length; i++) {
        let pentomino = this._pentominos[i];
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
Board.prototype.getPentominoAtPosition = function(x, y) {
    if (!this.positionIsValid(x, y)) {
        throw new Error("Position (" + x + "," + y + ") is outside the board");
    }

    if (this._array[x][y] === EMPTY_CELL) {
        throw new Error("No pentomino at position (" + x + ", " + y + ")");
    } else {
        let name = this._array[x][y];
        return this.getPentominoByName(name);
    }
}

/**
 * Returns whether the position is inside the board
 * @param x
 * @param y
 * @returns {boolean}
 */
Board.prototype.positionIsValid = function(x, y) {
    return !(x < 0
        || x >= this.size[0]
        || y < 0
        || y >= this.size[1]);
}

/** Returns whether the pentomino will fit onto the board at the specified position
 *
 * @param pentomino
 * @param x position to check
 * @param y position to check
 * @returns {boolean}
 */
Board.prototype.pentominoPositionIsValid = function(pentomino, x, y) {
    return !(x < 0
        || x + pentomino.width - 1 >= this.size[0]
        || y < 0
        || y + pentomino.height - 1 >= this.size[1]);
}

/**
 * Returns all pentomino objects that are currently placed on the board
 * @returns {Array}
 */
Board.prototype.getPentominos = function() {
    return this._pentominos;
}

// --- --- -- Debugging --- --- ---
/**
 * Prints board on html document for debugging purposes.
 */
Board.prototype.writeToDocument = function() {
    document.write("Board:<br>");
    for (let y = 0; y < this.size[1]; y++) {
        document.write("|");
        for (let x = 0; x < this.size[0]; x++) {
            document.write(this._array[x][y]);
        }
        document.write("|<br>");
    }
}

/**
 * Prints board to console for debugging purposes.
 */
Board.prototype.display = function() {
    for (let y = 0; y < this.size[1]; y++) {
        let row = "| ";
        for (let x = 0; x < this.size[0]; x++) {
            row = row + this._array[x][y] + ' ';
        }
        row = row + "|\n";
        console.log(row);
    }
}

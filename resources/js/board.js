/**
 * @desc:
 *      It will create a default board
 *
 * @param:
 *       size: {width,height}
 * @param:
 *       color: default color;
 *       shape: square, rectangle, christmas tree
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
            col.push('O');
        }

        this.array.push(col);
    }
}

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

Board.prototype.getPosition = function(pentomino) {
    if (!this.pentominoPositions.hasOwnProperty(pentomino.name)) {
        throw "No pentomino: " + pentomino.name + " placed on the board";
    } else {
        return this.pentominoPositions[pentomino.name];
    }
}

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
    // TODO - save pentomino in list

    for (i = 0; i < pentomino.height; i++) {
        for (j = 0; j < pentomino.width; j++) {
            if (pentomino.occupied_cells.charAt(i * pentomino.width + j) === '1') {
                this.array[j][i] = pentomino.name;
            }
        }
    }

    // TODO - return true or false whether occupied or not
}

let assert = require('chai').assert;

let Pentomino = require('../../js/pentomino.js');
let Board = require('../../js/board.js');

let cols = 7;
let rows = 5;
let board = new Board(cols, rows);

let X = new Pentomino('X');
let T = new Pentomino('T');
let I = new Pentomino('I');
let L = new Pentomino('L');

board.placePentomino(T, 1, 3);
board.placePentomino(X, 5, 1);
board.placePentomino(I, 6, 2);

board.movePentominoToPosition(X, 4, 1);

describe('Board.movePentominoToPosition(pentomino, x, y)', function() {

    it('should save piece at new position', function() {
        assert.deepEqual(board.getPosition(X), [4, 1]);
    });

    it('should throw error if piece is moved outside the board', function () {
        assert.throws(() => board.movePentominoToPosition(X, -1, -1));
        assert.throws(() => board.movePentominoToPosition(X, -1, 1));
        assert.throws(() => board.movePentominoToPosition(X, 1, -1));
        assert.throws(() => board.movePentominoToPosition(X, cols, rows));
        assert.throws(() => board.movePentominoToPosition(X, cols - 1, rows - 1));
    });

    it('should throw error if piece does not exist on board', function () {
       assert.throws(() => board.movePentominoToPosition(L, 2, 2));
    });
});

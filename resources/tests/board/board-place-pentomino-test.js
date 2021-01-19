let assert = require('chai').assert;

let Pentomino = require('../../js/pentomino.js');
let Board = require('../../js/board.js');

let cols = 7;
let rows = 5;
let board = new Board(cols, rows);

let X = new Pentomino('X');
let T = new Pentomino('T');
let I = new Pentomino('I');
let X2 = new Pentomino('X');
let L = new Pentomino('L');

board.placePentomino(T, 1, 3);
board.placePentomino(X, 5, 1);
board.placePentomino(I, 6, 2);

describe('Board.placePentomino(pentomino, x, y)', function() {

    it('should save piece at position', function() {
        assert.deepEqual(board.getPosition(T), [1, 3]);
    });

    it('should allow overlapping of pieces', function() {
        assert.deepEqual(board.getPosition(X), [5, 1]);
        assert.deepEqual(board.getPosition(I), [6, 2]);
    });

    it('should throw error if piece is placed outside the board', function () {
        assert.throws(() => board.placePentomino(L, -1, -1));
        assert.throws(() => board.placePentomino(L, -1, 1));
        assert.throws(() => board.placePentomino(L, 1, -1));
        assert.throws(() => board.placePentomino(L, cols, rows));
        assert.throws(() => board.placePentomino(L, cols - 1, rows - 1));
    });

    it('should throw error if piece already exists on board', function () {
        assert.throws(() => board.placePentomino(X, 3, 3));
        assert.throws(() => board.placePentomino(X2, 3, 3));
    });
});

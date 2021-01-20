let assert = require('chai').assert;

let Pentomino = require('../../js/pentomino.js');
let Board = require('../../js/board.js');

let rows = 7;
let cols = 5;
let board = new Board(rows, cols);

let X = new Pentomino('X');
let T = new Pentomino('T');
let I = new Pentomino('I');

board.placePentomino(T, 1, 3);
board.placePentomino(X, 5, 1);
board.placePentomino(I, 6, 2);

describe('Board.getPentominoesAtPosition(pentomino, x, y)', function() {

    it('should return piece at occupied cells', function() {
        assert.equal(board.getPentominoesAtPosition(1, 2)[0].name, 'T');
        assert.equal(board.getPentominoesAtPosition(1, 3)[0].name, 'T');
        assert.equal(board.getPentominoesAtPosition(1, 4)[0].name, 'T');
        assert.equal(board.getPentominoesAtPosition(0, 2)[0].name, 'T');
        assert.equal(board.getPentominoesAtPosition(2, 2)[0].name, 'T');
    });

    it('should return array of overlapping pieces', function() {
        assert.equal(board.getPentominoesAtPosition(5, 0)[0].name, 'X');
        assert.equal(board.getPentominoesAtPosition(5, 1)[0].name, 'X');
        assert.equal(board.getPentominoesAtPosition(4, 1)[0].name, 'X');
        assert.equal(board.getPentominoesAtPosition(5, 2)[0].name, 'X');

        assert.equal(board.getPentominoesAtPosition(6, 0)[0].name, 'I');
        assert.equal(board.getPentominoesAtPosition(6, 2)[0].name, 'I');
        assert.equal(board.getPentominoesAtPosition(6, 3)[0].name, 'I');
        assert.equal(board.getPentominoesAtPosition(6, 4)[0].name, 'I');

        let pieces = board.getPentominoesAtPosition(6, 1);
        assert.equal(pieces.length, 2);
        assert.ok((pieces[0].name === 'I' && pieces[1].name === 'X')
            || (pieces[0].name === 'X' && pieces[1].name === 'I'));
    });
});

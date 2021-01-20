let assert = require('chai').assert;

let Pentomino = require('../../js/pentomino.js');
let Board = require('../../js/board.js');

let board = new Board(7, 7);

let T = new Pentomino('T');
let I = new Pentomino('I');
let X = new Pentomino('X');
let F = new Pentomino('F');

board.placePentomino(T, 1, 3);
board.placePentomino(I, 3, 1);
board.placePentomino(F, 4, 2);

board.display();

describe('Board.getCollisionCells()', function() {

    it('should return a list of all colliding cells', function() {
        assert.strictEqual(board.getCollisionCells().length, 1);
        assert.strictEqual(board.getCollisionCells(), [
            {
                "cell": [1, 1],
                "pentominos": ['X', 'Y', 'T']
            },
            {
                "cell": [2, 2],
                "pentominos": ['T', 'F']
            }
        ]);
    });

    it('should return an empty list if no collision occured', function() {
        // TODO
    });
});

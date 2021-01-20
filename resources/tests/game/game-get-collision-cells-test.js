let assert = require('chai').assert;

let Pentomino = require('../../js/pentomino.js');
let Board = require('../../js/board.js');
let Game = require('../../js/game.js');

let game = new Game(new Board(7, 7));

let T = new Pentomino('T');
let I = new Pentomino('I');
let X = new Pentomino('X');
let F = new Pentomino('F');

game.placePentomino(T, 1, 3);
game.placePentomino(I, 3, 1);
game.placePentomino(X, -1, -1);
game.placePentomino(F, 4, 2);

game.display();

describe('Game.getCollisionCells()', function() {

    it('should return a list of all colliding cells', function() {
        assert.strictEqual(game.getCollisionCells(), [
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

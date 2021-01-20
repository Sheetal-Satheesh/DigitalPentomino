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

describe('Game.isCollides(pentomino)', function() {

    it('should return whether or not the pentomino is part of a collision', function() {
        assert.ok(game.isCollides(I));
        assert.ok(game.isCollides(F));
    });

    it('should throw error if pentomino is outside the board (no collision detection supported)', function () {
        // TODO
    });
});

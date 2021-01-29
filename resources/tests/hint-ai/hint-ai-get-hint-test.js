let assert = require('chai').assert;

let HintAI = require('../../js/hint-ai.js');
let Game = require('../../js/game.js');
let Board = require('../../js/board.js');

let game = new Game(new Board([0, 0], [5, 7]));

let hintAI = new HintAI();
hintAI.getMockSolutions();
let hint = hintAI.getHint(game);
console.log(hint);

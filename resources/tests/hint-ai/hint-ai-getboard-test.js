let assert = require('chai').assert;

let HintAI = require('../../js/hint-ai.js');
let Game = require('../../js/game.js');
let Board = require('../../js/board.js');

let hintAI = new HintAI();
let newGame = hintAI.getGameFromString('FFIIIII LFFPPUU LFXPPPU LXXXYUU LLXYYYY');
newGame.display();


/*

FFIIIII
LFFPPUU
LFXPPPU
LXXXYUU
LLXYYYY


    0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 1, 0, 0, 0, 0, 0
    0, 0, 1, 1, 1, 0, 0, 0, 0
    0, 0, 0, 1, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0

*/


let assert = require('chai').assert;

let HintAI = require('../../js/hint-ai.js');
let Game = require('../../js/game.js');
let Board = require('../../js/board.js');

let hintAI = new HintAI();
//let newGame = hintAI.getGameFromString('FFIIIII LFFPPUU LFXPPPU LXXXYUU LLXYYYY');
//let newGame = hintAI.getGameFromString('LLN LNN LNV LNV VVV');
//let newGame = hintAI.getGamesFromSolutionsConfig('UUUWLLLL.FTTTXIIIIIZV UYUWWNNLFF.TXXXPPZZZV YYYYWWNNNFFT.XPPPZVVV');
let solGames = hintAI.getGamesFromSolutionsConfig();
//newGame.display();


/*
__________________________
SOME EXAMPLES FOR TESTING
__________________________

Solution 1:
FFIIIII
LFFPPUU
LFXPPPU
LXXXYUU
LLXYYYY

    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0


Solution 2:
LLN 
LNN 
LNV 
LNV 
VVV


Solution 3:
UUUWLLLL.FTTTXIIIIIZV 
UYUWWNNLFF.TXXXPPZZZV 
YYYYWWNNNFFT.XPPPZVVV


*/


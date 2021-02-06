/**
 * Notes on implementation
 * 
 * 1. gameHeight/gameWidth are adjusted so that there are atleast
 *    3 rows/columns of game area on either side of the board
 *    (only if baseConfig doesnt already have this condition fulfilled)
 * 
 * 2. blocked cells should be denoted by their position with respect to the board and not the game,
 *    else their position might be calculated incorrectly
 */

boardConfigs = {
    "board_3x21a": {
        gameWidth: 27,
        boardSize: [3,21],
        blockedCells: [[0,3], [1,10], [2,17]]
    },
    "board_3x21b": {
        gameWidth: 27,
        boardSize: [3,21],
        blockedCells: [[0,8], [1,10], [2,12]]
    },
    "board_3x21c": {
        gameWidth: 27,
        boardSize: [3,21],
        blockedCells: [[0,9], [1,10], [2,11]]
    },
    "board_3x21d": {
        gameWidth: 27,
        boardSize: [3,21],
        blockedCells: [[1,4], [1,10], [1,16]]
    },
    "board_6x10": {
        boardSize: [6,10]
    },
    "board_8x8a": {
        gameHeight: 14,
        boardSize: [8,8],
        blockedCells: [[3,3], [3,4], [4,3], [4,4]]
    },
    "board_4x15": {
        boardSize: [4,15]
    }    
};
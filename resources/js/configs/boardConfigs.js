/**
 * Notes on implementation
 * 
 * 1. gameWidth is adjusted so that there are atleast
 *    3 columns of game area on either side of the board
 *    (only if baseConfig doesnt already have this condition fulfilled)
 * 
 * 2. blocked cells should be denoted by their position with respect to the board and not the game,
 *    else their position might be calculated incorrectly
 */

boardConfigs = {
    "board_3x21a": {
        gameWidth: 27,
        boardSize: [3, 21],
        gameCellPattern: "blockedCell",
        blockedCells: [[0, 3], [1, 10], [2, 17]]
    },
    "board_3x21b": {
        gameWidth: 27,
        boardSize: [3, 21],
        gameCellPattern: "blockedCell",
        blockedCells: [[0, 8], [1, 10], [2, 12]]
    },
    "board_3x21c": {
        gameWidth: 27,
        boardSize: [3, 21],
        gameCellPattern: "blockedCell",
        blockedCells: [[0, 9], [1, 10], [2, 11]]
    },
    "board_3x21d": {
        gameWidth: 27,
        boardSize: [3, 21],
        gameCellPattern: "blockedCell",
        blockedCells: [[1, 4], [1, 10], [1, 16]]
    },
    "board_6x10": {
        gameHeight: 10,
        boardSize: [6, 10]
    },
    "board_8x8a": {
        gameHeight: 11,
        boardSize: [8, 8],
        gameCellPattern: "blockedCell",
        blockedCells: [[3, 3], [3, 4], [4, 3], [4, 4]]
    },
    "board_4x15": {
        gameHeight: 12,
        boardSize: [4, 15]

    },
    "board_12x20": {
        gameWidth: 40,
        gameHeight: 17,
        boardSize: [11, 20],
        gameCellPattern: "gamearea",
        blockedCells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 19],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 16], [2, 17], [2, 18], [2, 19],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 15], [3, 16], [3, 17], [3, 18], [3, 19],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 15], [4, 16], [4, 17], [4, 18], [4, 19],
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 10], [5, 14], [5, 15], [5, 16], [5, 17], [5, 18], [5, 19],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 14], [6, 15], [6, 16], [6, 17], [6, 18], [6, 19],
        [7, 0], [7, 1], [7, 2], [7, 13], [7, 14], [7, 15], [7, 16], [7, 17], [7, 18], [7, 19],
        [8, 12], [8, 13], [8, 14], [8, 15], [8, 16], [8, 17], [8, 18], [8, 19],
        [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 7], [9, 8], [9, 9], [9, 12], [9, 13], [9, 14], [9, 15], [9, 16], [9, 17], [9, 18], [9, 19],
        [10, 0], [10, 1], [10, 2], [10, 3], [10, 4], [10, 7], [10, 8], [10, 9], [10, 12], [10, 13], [10, 14], [10, 15], [10, 16], [10, 17], [10, 18], [10, 19],
        ]
    }
};

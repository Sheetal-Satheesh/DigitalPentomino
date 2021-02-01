/**
 * This global config should be loaded from any configuration file or take input
 * from user. 
 * 
 * TODO: Must be replaced the static cofiguartion with appropriate functionality 
 */


/*config = {
    gameWidth: 25,
    gameHeight: 12,
    boardSize : [6,10],
    boardShape : "Block"
};*/

baseConfig = {
	gameWidth: 25,
	gameHeight: 10,
	board_6x10:{
				boardSize : [6,10],
				boardShape : "Block"
	},
	board_8x8a:{
				boardSize : [8,8],
				blockedCells: [[4,11],[4,12],[5,11],[5,12]],  /*TODO: needs to be dynamically handle*/ 
				boardShape : "Block"
	},
	board_4x15:{
				boardSize : [4,15],
				boardShape : "Block"
	}
		
};

boardCfg = {
	board: 'board_8x8a'
};

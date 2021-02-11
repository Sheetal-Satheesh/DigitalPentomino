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
	},
	board_3x21a:{
				boardSize : [3,21],
				blockedCells: [[3,5],[4,12],[5,19]],
				boardShape : "Block"
	},
	board_3x21b:{
				boardSize : [3,21],
				blockedCells: [[3,10],[4,12],[5,14]],
				boardShape : "Block"
	},
	board_3x21c:{
				boardSize : [3,21],
				blockedCells: [[3,11],[4,12],[5,13]],
				boardShape : "Block"
	},
	board_3x21d:{
				boardSize : [3,21],
				blockedCells: [[4,6],[4,12],[4,18]],
				boardShape : "Block"
	}	
};	


boardCfg = {
	board: 'board_8x8a'
};

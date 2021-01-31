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
	board_6x10:{
				gameWidth: 25,
				gameHeight: 12,
				boardSize : [6,10],
				boardShape : "Block"
	},
	board_8x8a:{
				gameWidth: 25,
				gameHeight: 12,
				boardSize : [8,8],
				blockedCells: [[5,11],[5,12],[6,11],[6,12]],
				boardShape : "Block"
	},
	board_4x15:{
				gameWidth: 25,
				gameHeight: 12,
				boardSize : [4,15],
				boardShape : "Block"
	}
		
};

selectedConfig = {
	configName: 'board_8x8a'
};

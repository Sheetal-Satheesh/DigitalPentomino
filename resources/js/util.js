class UtilitiesClass {

    static getRandomElementFromArray(arrayObject) {
        if (Array.isArray(arrayObject)) {
            return arrayObject[Math.floor(Math.random() * arrayObject.length)];
        }
        return undefined;
    }

    /*
    * Returns a game object of the selected/default game that can be used to draw the board
    */
    static getGameUISettings(boardName) {

        //read gameWidth and gameHeight dynamically from board
        let fieldHTML = document.getElementById('field');
        let heightField = document.getElementById('field').clientHeight;
        let widthField = document.getElementById('field').clientWidth;

        //calculate needed blocks in width based on available height
        //TODO: if height > width invert!
        let blockAmountHeight = boardConfigs[boardName].boardSize[0] + 4;
        let absHeightPerBlock = heightField / blockAmountHeight;
        let ratioFieldWidthHeight = widthField / heightField;
        let blockAmountWidth = Math.round(blockAmountHeight * ratioFieldWidthHeight);
        //check if wide enough to display full board, else increase boardWidth
        if (blockAmountWidth < boardConfigs[boardName].boardSize[1] + 4){
            blockAmountWidth = boardConfigs[boardName].boardSize[1] + 4;
        }
        baseConfigs.gameHeight = blockAmountHeight;
        baseConfigs.gameWidth = blockAmountWidth;

        return {
            gameHeight: baseConfigs.gameHeight,
            gameWidth: baseConfigs.gameWidth,
            boardSize: boardConfigs[boardName].boardSize,
            blockedCells: boardConfigs[boardName].blockedCells || undefined,
            boardShape: boardConfigs[boardName].boardShape || baseConfigs.boardShape
        };
    }

    static getBoardStartCoords(boardName) {
        let gameObject = this.getGameUISettings(boardName);
        console.log("Game object height: " + gameObject.gameHeight);
        console.log("Game object width: " + gameObject.gameWidth);

        return [
            Math.floor((gameObject.gameHeight - gameObject.boardSize[0]) / 2),
            Math.floor((gameObject.gameWidth - gameObject.boardSize[1]) / 2)
        ];
    }
}
class UtilitiesClass {

    static boardName = undefined;

    static setBoardName(boardName) {
        if(!boardName) {
            new Error("Please provide valid board name");
        }
        this.boardName = boardName;
    }

    static getRandomElementFromArray(arrayObject) {
        if (Array.isArray(arrayObject)) {
            return arrayObject[Math.floor(Math.random() * arrayObject.length)];
        }
        return undefined;
    }

    /*
    * Returns a game object of the selected/default game that can be used to draw the board
    */
    static getGameUISettings() {
        let boardName = this.boardName;
        return {
            gameHeight: boardConfigs[boardName].gameHeight || baseConfigs.gameHeight,
            gameWidth: boardConfigs[boardName].gameWidth || baseConfigs.gameWidth,
            boardSize: boardConfigs[boardName].boardSize,
            blockedCells: boardConfigs[boardName].blockedCells || undefined,
            boardShape: boardConfigs[boardName].boardShape || baseConfigs.boardShape
        };
    }

    static getBoardStartCoords() {
        let gameObject = this.getGameUISettings(this.boardName);
        return [
            Math.floor((gameObject.gameHeight - gameObject.boardSize[0]) / 2),
            Math.floor((gameObject.gameWidth - gameObject.boardSize[1]) / 2)
        ];
    }
}
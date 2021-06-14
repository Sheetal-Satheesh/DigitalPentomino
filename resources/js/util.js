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
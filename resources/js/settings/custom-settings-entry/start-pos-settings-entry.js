const NO_POS_SELECTED = "";
const BOARD_NAME_DECIMALS_MIN = 3;

class StartPosSettingsEntry extends CustomSettingsEntry {
    constructor(heading, subheading) {
        super(heading, subheading);
    }

    create(settingsEntry) {
        let div = document.createElement("div");
        div.id = this._name;
        div.name = this._name;

        let saveButton = SettingsForm.createButton("Save current board", {});
        saveButton.onclick = (event) => this.handleClickedOnSave(event, div);
        div.appendChild(saveButton);
        div.appendChild(document.createElement("br"));
        let clearButton = SettingsForm.createButton("Discard saved board", {});
        clearButton.onclick = (event) => this.handleClickedOnClear(event, div);
        div.appendChild(clearButton);
        div.appendChild(document.createElement("br"));
        div.appendChild(SettingsForm.createLabel("Saved board: "));
        let resultLabel = SettingsForm.createLabel(NO_POS_SELECTED);
        resultLabel.id = "startPiecePosLabel";
        resultLabel.name = "startPiecePosLabel";
        div.appendChild(resultLabel);
        div.appendChild(document.createElement("br"));

        return div;
    }

    handleClickedOnSave(event, div) {
        let resultLabel = $(div).find("#startPiecePosLabel")[0];

        let game = new FrontController().controller.game();
        resultLabel.innerHTML = this.parseFromGameToSeed(game);
    }

    handleClickedOnClear(event, div) {
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        resultLabel.innerHTML = NO_POS_SELECTED;
    }

    collect(formElement) {
        let div = $(formElement).find("#" + this._name)[0];
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        return resultLabel.textContent;
    }

    update(heading, subheading, schemaEntry, selectedValue, formElement) {
        let div = $(formElement).find("#" + this._name)[0];
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        resultLabel.textContent = selectedValue;
    }

    parseSettingsToSeed(schemaEntry, settingsValue) {
        return settingsValue;
    }

    parseFromSeed(schemaEntry, remainingSeed, settingsEntry, key, seed) {
        let n = parseInt(remainingSeed.substr(this.getBoardNameDecimals(), 2));
        let seedEntryLength = this.getBoardNameDecimals() + 2 + n * 5;
        settingsEntry[key] = remainingSeed.substr(0, seedEntryLength);
        return seedEntryLength - 1;
    }

    processChangesToSettings(settingsValue, pd) {
        let game = this.parseFromSeedToGame(settingsValue);

        game.getPentominoesOnBoard().forEach(p => {
            let pos = game.getPosition(p);
            this.placePiece(p.name, pos[0], pos[1]);
        });

        pd.visual.renderPieces();
    }

    placePiece(pieceName, row, col) {
        let piece = pd.visual.pieces.filter(p => p.name === pieceName)[0];
        piece.updateTrayValue(0);
        pd.gameController.placePentomino(piece, row, col);
    }

    // === === === PARSE HELPER === === ===
    parseFromSeedToGame(seed) {
        let boardNameDecimals = this.getBoardNameDecimals();
        let boardName = this.parseIndexToBoardName(parseInt(seed.substr(0, boardNameDecimals)));

        let game = new Game(new Board([0, 0], [100, 100]), boardName);

        let n = parseInt(seed.substr(boardNameDecimals, 2));

        for (let i = 0; i < n; i++) {
            let offset = boardNameDecimals + 2;
            let name = seed.substr(i * 5 + offset, 1);
            let row = parseInt(seed.substr(i * 5 + offset + 1, 2));
            let col = parseInt(seed.substr(i * 5 + offset + 3, 2));
            game.placePentomino(new Pentomino(name), row,col);
        }

        return game;
    }

    parseFromGameToSeed(game) {
        let seed = "";

        seed += this.pad(this.parseBoardNameToIndex(game.getName()), this.getBoardNameDecimals());

        let pentominoesOnBoard = game.getPentominoesOnBoard();
        seed += this.pad(pentominoesOnBoard.length, 2);

        pentominoesOnBoard.forEach(p => {
            let pos = game.getPosition(p);

            seed += p.name;
            seed += this.pad(pos[0], 2);
            seed += this.pad(pos[1], 2);
        });

        return seed;
    }

    // from https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    pad(num, minDecimals) {
        num = num.toString();
        while (num.length < minDecimals) num = "0" + num;
        return num;
    }

    parseBoardNameToIndex(boardName) {
        let allBoardNames = baseConfigs.boards;
        return allBoardNames.findIndex(n => n === boardName);
    }

    parseIndexToBoardName(index) {
        return baseConfigs.boards[index];
    }

    getBoardNameDecimals() {
        return Math.max(BOARD_NAME_DECIMALS_MIN, SettingsParser.getNumOfDigits(baseConfigs.boards.length));
    }
}

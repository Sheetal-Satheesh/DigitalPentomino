const NO_POS_SELECTED = "00";

class StartPosSettingsEntry extends CustomSettingsEntry {
    constructor(heading, subheading) {
        super(heading, subheading);
    }

    create(settingsEntry) {
        let div = document.createElement("div");
        div.id = this._name;
        div.name = this._name;

        let saveButton = SettingsForm.createButton("Use current positions", {});
        saveButton.onclick = (event) => this.handleClickedOnSave(event, div);
        div.appendChild(saveButton);
        div.appendChild(document.createElement("br"));
        let clearButton = SettingsForm.createButton("Clear", {});
        clearButton.onclick = (event) => this.handleClickedOnClear(event, div);
        div.appendChild(clearButton);
        div.appendChild(document.createElement("br"));
        div.appendChild(SettingsForm.createLabel("Start positions: "));
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
        let pentominoesOnBoard = game.getPentominoesInGmArea().filter(pentomino => game.isPlacedOnBoard(pentomino));

        let pentominoesAndPos = [];

        pentominoesOnBoard.forEach(pentomino => {
            let pos = game.getPosition(pentomino);

            pentominoesAndPos.push({
                pentomino: pentomino,
                position: pos
            });
        });

        resultLabel.innerHTML = this.parseFromObjectsToSeed(pentominoesAndPos);
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
        let n = parseInt(remainingSeed.substr(0, 2));
        settingsEntry[key] = remainingSeed.substr(0, n * 5 + 2);
        return n * 5 + 1;
    }

    processChangesToSettings(settingsValue, pd) {
        let pentominoesAndPos = this.parseFromSeedToObjects(settingsValue);

        pentominoesAndPos.forEach(pentominoesAndPos => {
            let pentomino = pentominoesAndPos.pentomino;
            let pos = pentominoesAndPos.position;

            this.placePiece(pentomino.name, pos[0], pos[1]);
        });

        pd.visual.renderPieces();
    }

    placePiece(pieceName, row, col) {
        let piece = pd.visual.pieces.filter(p => p.name === pieceName)[0];
        piece.updateTrayValue(0);
        pd.gameController.placePentomino(piece, row, col);
    }

    // === === === PARSE HELPER === === ===
    parseFromSeedToObjects(seed) {
        let pentominoesAndPos = [];

        let n = parseInt(seed.substr(0, 2));

        for (let i = 0; i < n; i++) {
            let name = seed.substr(i * 5 + 2, 1);
            let row = parseInt(seed.substr(i * 5 + 2 + 1, 2));
            let col = parseInt(seed.substr(i * 5 + 2 + 3, 2));
            pentominoesAndPos.push({
                pentomino: new Pentomino(name),
                position: [row, col]
            });
        }

        return pentominoesAndPos;
    }

    parseFromObjectsToSeed(pentominoesAndPos) {
        let n = pentominoesAndPos.length;
        let result = this.pad(n, 2);

        pentominoesAndPos.forEach(pentominoesAndPos => {
            let pentomino = pentominoesAndPos.pentomino;
            let pos = pentominoesAndPos.position;

            result += pentomino.name;
            result += this.pad(pos[0], 2);
            result += this.pad(pos[1], 2);
        });

        return result;
    }

    // from https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    pad(num, minDecimals) {
        num = num.toString();
        while (num.length < minDecimals) num = "0" + num;
        return num;
    }
}

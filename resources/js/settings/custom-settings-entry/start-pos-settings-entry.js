const NO_POS_SELECTED = "-";

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

        let resultText = "" + pentominoesOnBoard.length;

        pentominoesOnBoard.forEach(pentomino => {
            let pos = game.getPosition(pentomino);
            resultText += pentomino.name + "(" + pos[0] + "," + pos[1] + ") ";
        });

        resultLabel.innerHTML = resultText;
    }

    handleClickedOnClear(event, div) {
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        resultLabel.innerHTML = NO_POS_SELECTED;
    }

    collect(formElement) {
        let div = $(formElement).find("#" + this._name)[0];
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        if (!(resultLabel.textContent === NO_POS_SELECTED)) {
            return resultLabel.textContent;
        } else {
            return NO_POS_SELECTED;
        }
    }

    update(heading, subheading, schemaEntry, selectedValue, formElement) {
        let div = $(formElement).find("#" + this._name)[0];
        let resultLabel = $(div).find("#startPiecePosLabel")[0];
        resultLabel.textContent = selectedValue;
    }

    parseSettingsToSeed(schemaEntry, settingsValue) {
        let result = "";

        let n = settingsValue[0];
        result += this.pad(n, 2);
        let rest = settingsValue.substr(1, settingsValue.length - 1);
        let split = rest.split(" ");
        for (let i = 0; i < n; i++) {
            let pentominoName = split[i][0];
            result += pentominoName;
            let splitNoName = split[i].substr(1, split[i].length - 1);
            let element = splitNoName.substr(1, splitNoName.length - 2).split(",");
            result += this.pad(element[0], 2);
            result += this.pad(element[1], 2);
        }

        return result;
    }

    parseFromSeed(schemaEntry, remainingSeed, settingsEntry, key, seed) {
        let n = parseInt(remainingSeed.substr(0, 2));
        settingsEntry[key] = remainingSeed.substr(0, n * 5 + 2);
        return n * 5 + 1;
    }

    // from https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    pad(num, minDecimals) {
        num = num.toString();
        while (num.length < minDecimals) num = "0" + num;
        return num;
    }

    processChangesToSettings(settingsValue, pd) {
        let visual = pd.visual;
        visual.placePentomino(new Pentomino('T'), 7, 4);
        visual.renderPieces();
    }
}

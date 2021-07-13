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

        let resultText = "";

        pentominoesOnBoard.forEach(pentomino => {
            let pos = game.getPosition(pentomino);
            resultText += pentomino.name + "(" + pos[0] + ", " + pos[1] + ") ";
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
            return "";
        }
    }

    update(heading, subheading, schemaEntry, selectedValue, formElement) {
        // TODO
    }

    parseSettingsToSeed(schemaEntry, settingsValue) {
        // TODO
    }

    parseFromSeed(schemaEntry, remainingSeed, settingsEntry, key, seed) {
        // TODO
    }
}
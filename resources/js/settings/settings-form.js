class SettingsForm {

    // === === === GENERATE FORM === === ===
    static generateForm(formElement, schema, onSubmit) {

        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            for (let key in subSettings) {
                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;
                switch (settingsEntryType) {
                    case "boolean":
                        SettingsForm.addBooleanEntry(formElement, settingsEntry);
                        break;
                    case "string":
                        SettingsForm.addStringEntry(formElement, settingsEntry);
                        break;
                    case "integer":
                        SettingsForm.addIntegerEntry(formElement, settingsEntry);
                        break;
                    case "number":
                        SettingsForm.addNumberEntry(formElement, settingsEntry);
                        break;
                    default:
                        throw new Error("Unknown type: " + settingsEntryType)
                }
            }
        }

        formElement.appendChild(SettingsForm.createSubmitButton());
        formElement.onSubmit(function () {
            let data = SettingsForm.collectDataFromForm();
            onSubmit(data);
        });
    }

    static collectDataFromForm() {
        return {};
    }

    static addBooleanEntry() {
        // TODO
    }

    static addStringEntry(formElement, settingsEntry) {
        formElement.appendChild(SettingsForm.createStringFormElement(settingsEntry));
    }

    static addNumberEntry() {
        // TODO
    }

    static addIntegerEntry() {
        // TODO
    }

    static createBooleanFormElement(settingsEntry) {
        // TODO
    }

    static createStringFormElement(settingsEntry) {
        let selectElement = document.createElement("select");

        let i = 0;
        for (let enumElement in settingsEntry.enum) {
            let optionElement = document.createElement("option");
            optionElement.innerHTML = settingsEntry.enumText[i];
            optionElement.value = enumElement;
            selectElement.appendChild(optionElement);
            i++;
        }

        return selectElement;
    }

    static createSubmitButton() {
        let submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.innerHTML = "Submit";
        return submitButton;
    }

    // === === === UPDATE FORM === === ===
    static updateForm(formElement, schema, settings) {
        // TODO
    }
}

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
                        SettingsForm.addBooleanEntry(formElement, settingsEntry, heading, key);
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
                        throw new Error("Unknown type: " + settingsEntryType);
                }
            }
        }

        formElement.appendChild(SettingsForm.createSubmitButton());

        $(formElement).submit(function(event) {
            let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();
            let data = SettingsForm.collectDataFromForm(formElement, schema);
            console.log(data);
            event.preventDefault();
            // FIXME
            // onSubmit(data);
        });
    }

    static collectDataFromForm(formElement, schema) {
        let result = {};

        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            result[heading] = {};
            for (let key in subSettings) {
                let name = heading + "." + key;
                let htmlElement = $(formElement).find("input[name='" + name + "']")[0];

                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;
                switch (settingsEntryType) {
                    case "boolean":
                        result[heading][key] = htmlElement.checked;
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
                        throw new Error("Unknown type: " + settingsEntryType);
                }
            }
        }

        return result;
    }

    static addBooleanEntry(formElement, settingsEntry, heading, key) {
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", "checkbox");
        inputElement.name = heading + "." + key;
        formElement.appendChild(inputElement);
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

class SettingsForm {

    // === === === GENERATE FORM === === ===
    static generateForm(formElement, schema, onSubmit) {

        SettingsForm.createForm(formElement, schema);

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

    // --- --- --- Form Creation --- --- ---
    static createForm(formElement, schema) {
        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            for (let key in subSettings) {
                let elementName = heading + "." + key;

                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;

                let div = document.createElement("div");
                formElement.appendChild(div);

                switch (settingsEntryType) {
                    case "boolean":
                        let checkbox = SettingsForm.createInputElement("checkbox", elementName);
                        div.appendChild(checkbox);
                        let label = SettingsForm.createLabel(settingsEntry.title, {"htmlFor": checkbox.id});
                        div.appendChild(label);
                        break;
                    case "string":
                        div.appendChild(SettingsForm.addStringEntry(formElement, settingsEntry));
                        break;
                    case "integer":
                        let integerInputElementLabel = SettingsForm.createLabel(settingsEntry.title, {"htmlFor": elementName});
                        div.appendChild(integerInputElementLabel);
                        let integerInputElement = SettingsForm.createInputElement("integer", elementName);
                        div.appendChild(integerInputElement);
                        break;
                    case "number":
                        let numberInputElementLabel = SettingsForm.createLabel(settingsEntry.title, {"htmlFor": elementName});
                        div.appendChild(numberInputElementLabel);
                        let numberInputElement = SettingsForm.createInputElement("integer", elementName);
                        div.appendChild(numberInputElement);
                        break;
                    default:
                        throw new Error("Unknown type: " + settingsEntryType);
                }
            }
        }
    }

    static createInputElement(type, name) {
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", type);
        inputElement.name = name;
        inputElement.id = name;
        return inputElement;
    }

    static createLabel(text, options) {
        let labelElement = document.createElement("label");
        labelElement.innerHTML = text;

        if (!(options.htmlFor === undefined)) {
            labelElement.htmlFor = options.htmlFor;
        }

        return labelElement;
    }

    static addStringEntry(formElement, settingsEntry) {
        return SettingsForm.createStringFormElement(settingsEntry);
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

    // --- --- --- Data collection --- --- ---
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
                        // TODO
                        break;
                    case "integer":
                        // TODO
                        break;
                    case "number":
                        // TODO
                        break;
                    default:
                        throw new Error("Unknown type: " + settingsEntryType);
                }
            }
        }

        return result;
    }

    // === === === UPDATE FORM === === ===
    static updateForm(formElement, schema, settings) {
        // TODO
    }
}

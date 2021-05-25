class SettingsForm {

    // === === === GENERATE FORM === === ===
    static generateForm(formElement, onSubmit) {
        let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();
        let settings = SettingsSingleton.getInstance().getSettings();

        let teacherURLLabel = null;
        let pupilURLLabel = null;

        if (settings.teachersMode) {
            teacherURLLabel = SettingsForm.createLabel("-");
            pupilURLLabel = SettingsForm.createLabel("-");
        }

        SettingsForm.createForm(formElement, schema, settings, teacherURLLabel, pupilURLLabel);

        formElement.appendChild(document.createElement("br"));
        formElement.appendChild(document.createElement("br"));

        if (settings.teachersMode) {
            formElement.appendChild(SettingsForm.createLabel("Teacher Link: "));
            formElement.appendChild(teacherURLLabel);
            formElement.appendChild(document.createElement("br"));
            formElement.appendChild(SettingsForm.createLabel("Pupil Link: "));
            formElement.appendChild(pupilURLLabel);
            formElement.appendChild(document.createElement("br"));
        }

        formElement.appendChild(SettingsForm.createSubmitButton());

        $(formElement).submit(function(event) {
            let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();
            let settings = SettingsSingleton.getInstance().getSettings();
            let settingsClone = SettingsForm.collectDataFromForm(formElement, schema, settings);
            console.log(settingsClone);
            event.preventDefault();
            onSubmit(false, settingsClone);
        });
    }

    // --- --- --- Form Creation --- --- ---
    static createForm(formElement, schema, settings, teacherURLLabel, pupilURLLabel) {
        let creatingNormalSettings = true;
        let advancedSettingsDiv = document.createElement("div");
        advancedSettingsDiv.style.display = "none";

        let htmlElement = formElement;

        for (let heading in schema) {
            if (!settings.teachersMode && !settings.visibility.isVisible(heading)) {
                continue;
            }
            let subSettings = schema[heading].properties;

            if (creatingNormalSettings && schema[heading].advanced) {
                creatingNormalSettings = false;
                htmlElement = advancedSettingsDiv;

                let lang = SettingsSingleton.getInstance().getSettings().general.language;

                let advancedSettingsButton = SettingsForm.createCollapsibleButton(
                    strings.settings.advanced.show[lang],
                    strings.settings.advanced.hide[lang]);
                formElement.appendChild(advancedSettingsButton);
            }

            htmlElement.appendChild(SettingsForm.createHeader("h3", schema[heading].title));
            htmlElement.appendChild(document.createElement("br"));

            for (let key in subSettings) {
                if (!settings.teachersMode && !settings.visibility.isVisible(heading, key)) {
                    continue;
                }
                let elementName = heading + "." + key;

                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;

                let div = document.createElement("div");
                htmlElement.appendChild(div);

                switch (settingsEntryType) {
                    case "boolean":
                        let checkbox = SettingsForm.createInputElement("checkbox", elementName);
                        if (settings.teachersMode) {
                            checkbox.onclick = function() {
                                SettingsForm.handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel);
                            };
                        }
                        div.appendChild(checkbox);
                        let label = SettingsForm.createLabel(settingsEntry.title, {
                            for: checkbox.id
                        });
                        div.appendChild(label);
                        break;
                    case "string":
                        let selectElementLabel = SettingsForm.createLabel(settingsEntry.title);
                        div.appendChild(selectElementLabel);
                        if (settingsEntry.imgPaths === undefined) {
                            let selectElement = SettingsForm.createSelectElement(
                                elementName,
                                settingsEntry.enum,
                                settingsEntry.enumText);
                            if (settings.teachersMode) {
                                selectElement.onchange = function() {
                                    SettingsForm.handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel);
                                };
                            }
                            div.appendChild(selectElement);
                        } else {
                            let imgElement = SettingsForm.createImgSelectElement(
                                elementName,
                                settingsEntry.enum,
                                settingsEntry.enumText,
                                settingsEntry.imgPaths
                            );
                            if (settings.teachersMode) {
                                imgElement.childNodes.forEach(childButton => {
                                    childButton.addEventListener("click", (event) => {
                                        SettingsForm.handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel);
                                    });
                                });
                            }
                            div.appendChild(imgElement);
                        }
                        break;
                    case "integer":
                        let integerInputElementLabel = SettingsForm.createLabel(settingsEntry.title);
                        div.appendChild(integerInputElementLabel);
                        let integerInputElement = SettingsForm.createInputElement("number", elementName, {
                            step: 1,
                            value: settingsEntry.defaultValue,
                            min: settingsEntry.minimum,
                            max: settingsEntry.maximum
                        });
                        if (settings.teachersMode) {
                            integerInputElement.onchange = function() {
                                SettingsForm.handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel);
                            };
                        }
                        div.appendChild(integerInputElement);
                        break;
                    case "number":
                        let numberInputElementLabel = SettingsForm.createLabel(settingsEntry.title);
                        div.appendChild(numberInputElementLabel);
                        let numberInputElement = SettingsForm.createInputElement("number", elementName, {
                            step: 0.1,
                            value: settingsEntry.defaultValue,
                            min: settingsEntry.minimum,
                            max: settingsEntry.maximum
                        });
                        if (settings.teachersMode) {
                            numberInputElement.onchange = function() {
                                SettingsForm.handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel);
                            };
                        }
                        div.appendChild(numberInputElement);
                        break;
                    default:
                        throw new Error("Unknown type: " + settingsEntryType);
                }

                if (!(settingsEntry.description === undefined)) {
                    div.appendChild(document.createElement("br"));
                    let descriptionLabel = SettingsForm.createLabel(settingsEntry.description);
                    div.appendChild(descriptionLabel);
                }
                div.appendChild(document.createElement("br"));
            }
        }

        if (SettingsSingleton.getInstance().getSettings().teachersMode) {
            htmlElement.appendChild(SettingsForm.createHeader("h3", "Displayed Settings in Pupil Mode"));
            htmlElement.appendChild(SettingsForm.createTeachersAdvancedSettings(schema));
        }

        formElement.appendChild(advancedSettingsDiv);
    }

    static handleSettingsFormChange(formElement, teacherURLLabel, pupilURLLabel) {
        let settings = SettingsSingleton.getInstance().getSettings();
        let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();

        let currentSettings = SettingsForm.collectDataFromForm(formElement, schema, settings);
        let seed = SettingsParser.parseSettingsToSeed(schema, currentSettings);

        teacherURLLabel.innerHTML = baseConfigs.url + "?" + baseConfigs.seedUrlParamName + "=" + seed;
        pupilURLLabel.innerHTML = "detected";
    }

    static createCollapsibleButton(showText, hideText) {
        let buttonElement = SettingsForm.createButton(showText.toUpperCase(), {
            "class": "collapsible"
        });

        buttonElement.addEventListener("click", function(event) {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                buttonElement.innerHTML = showText.toUpperCase();
            } else {
                content.style.display = "block";
                buttonElement.innerHTML = hideText.toUpperCase();
            }
        });

        return buttonElement;
    }

    static createTeachersAdvancedSettings(schema) {
        let useInClassElement = document.createElement("div");

        for (let heading in schema) {
            let subSettings = schema[heading].properties;

            useInClassElement.appendChild(SettingsForm.createHeader("h4", heading));

            for (let key in subSettings) {
                let elementName = heading + "." + key;

                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;

                useInClassElement.appendChild(
                    SettingsForm.createLabel(key)
                );

                useInClassElement.appendChild(
                    SettingsForm.createInputElement("checkbox",  "teachers." + elementName));
                useInClassElement.appendChild(document.createElement("br"));
            }
        }

        return useInClassElement;
    }

    static createHeader(type, text) {
        let header = document.createElement(type);
        header.innerHTML = text;
        return header;
    }

    static createInputElement(type, name, options) {
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", type);
        inputElement.name = name;
        inputElement.id = name;

        if (!(options === undefined)) {
            for (let [key, value] of Object.entries(options)) {
                inputElement.setAttribute(key, value);
            }
        }

        // Custom error messages
        if (type === "number") {
            let lang = SettingsSingleton.getInstance().getSettings().general.language;

            inputElement.addEventListener('invalid', (event) => {
                if (event.target.validity.rangeUnderflow) {
                    event.target.setCustomValidity(strings.settings.errors.lowerThanMin[lang] + " " + options.min);
                } else if (event.target.validity.rangeOverflow) {
                    event.target.setCustomValidity(strings.settings.errors.higherThanMax[lang] + " " + options.max);
                } else if (event.target.validity.badInput) {
                    event.target.setCustomValidity(strings.settings.errors.numberBadInput[lang]);
                }
            });

            inputElement.addEventListener('change', (event) => {
                event.target.setCustomValidity('');
            });
        }

        return inputElement;
    }

    static createLabel(text, options) {
        let labelElement = document.createElement("label");
        labelElement.innerHTML = text;

        if (!(options === undefined)) {
            for (let [key, value] of Object.entries(options)) {
                labelElement.setAttribute(key, value);
            }
        }

        return labelElement;
    }

    static createSelectElement(name, enumElements, enumTexts) {
        let selectElement = document.createElement("select");
        selectElement.name = name;
        selectElement.id = name;

        for (let i = 0; i < enumElements.length; i++) {
            let optionElement = document.createElement("option");
            optionElement.innerHTML = enumTexts[i];
            optionElement.value = enumElements[i];
            selectElement.appendChild(optionElement);
        }

        return selectElement;
    }

    static createImgSelectElement(name, enumElements, enumTexts, imgPaths) {
        let div = document.createElement("div");
        div.value = enumElements[0];
        div.setAttribute("name", name);
        div.id = name;

        let i = 0;
        imgPaths.forEach(imgPath => {
            let buttonElement = SettingsForm.createButton(undefined,{
                style: "background:url(" + imgPath + ");background-size: 100%;",
            });

            // FIXME: quick fix
            let image = new Image();
            image.src = imgPath;
            image.onload = () => {
                buttonElement.style.height = image.height + "px";
                buttonElement.style.width = image.width + "px";
            };

            let enumElement = enumElements[i];
            buttonElement.addEventListener("click", (event) => {
                div.childNodes.forEach(childNode => childNode.classList.remove("selected"));
                div.value = enumElement;
                if (buttonElement.classList.contains("selected")) {
                    buttonElement.classList.remove("selected");
                } else {
                    buttonElement.classList.add("selected");
                }
            });
            div.appendChild(buttonElement);
            i++;
        });

        return div;
    }

    static createButton(text, options) {
        let buttonElement = document.createElement("button");
        buttonElement.type = "button";
        if (!(text === undefined)) buttonElement.innerHTML = text;

        if (!(options === undefined)) {
            for (let [key, value] of Object.entries(options)) {
                buttonElement.setAttribute(key, value);
            }
        }

        return buttonElement;
    }

    static createSubmitButton() {
        return SettingsForm.createButton("Submit",{
            type: "submit"
        });
    }

    // --- --- --- Data collection --- --- ---
    static collectDataFromForm(formElement, schema, settings) {

        let result = jQuery.extend(true, { }, settings);

        for (let heading in schema) {
            if (!settings.teachersMode && !settings.visibility.isVisible(heading)) {
                continue;
            }
            let subSettings = schema[heading].properties;
            for (let key in subSettings) {
                if (!settings.teachersMode && !settings.visibility.isVisible(heading, key)) {
                    continue;
                }

                let name = heading + "." + key;

                let settingsEntry = subSettings[key];
                let settingsEntryType = settingsEntry.type;
                switch (settingsEntryType) {
                    case "boolean":
                        let checkBoxElement = $(formElement).find("input[name='" + name + "']")[0];
                        result[heading][key] = checkBoxElement.checked;
                        break;
                    case "string":
                        if (settingsEntry.imgPaths === undefined) {
                            let selectElement = $(formElement).find("select[name='" + name + "']")[0];
                            result[heading][key] = selectElement.value;
                        } else {
                            let divElement = $(formElement).find("div[name='" + name + "']")[0];
                            result[heading][key] = divElement.value;
                        }
                        break;
                    case "integer":
                        let integerInputElement = $(formElement).find("input[name='" + name + "']")[0];
                        result[heading][key] = parseInt(integerInputElement.value);
                        break;
                    case "number":
                        let numberInputElement = $(formElement).find("input[name='" + name + "']")[0];
                        result[heading][key] = parseFloat(numberInputElement.value);
                        break;
                    default:
                        throw new Error("Unknown type: " + settingsEntryType);
                }
            }
        }

        if (settings.teachersMode) {
            for (let heading in schema) {
                let subSettings = schema[heading].properties;
                for (let subheading in subSettings) {
                    let inputElement = $("input[name='teachers." + heading + "." + subheading + "']")[0];
                    result.visibility.setVisible(heading, subheading, inputElement.checked);
                }
            }
        }

        return result;
    }

    // === === === UPDATE FORM === === ===
    static updateForm(formElement) {
        let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();
        let settings = SettingsSingleton.getInstance().getSettings();

        for (let heading in schema) {
            if (!settings.teachersMode && !settings.visibility.isVisible(heading)) {
                continue;
            }
            let subSettings = schema[heading].properties;
            for (let subheading in subSettings) {
                if (!settings.teachersMode && !settings.visibility.isVisible(heading, subheading)) {
                    continue;
                }
                let schemaEntry = schema[heading]["properties"][subheading];
                switch (schemaEntry.type) {
                    case "boolean":
                        SettingsForm.editBooleanSchemaEntry(heading, subheading, settings[heading][subheading], formElement);
                        break;
                    case "number": case "integer":
                        SettingsForm.editInputSchemaEntry(heading, subheading, settings[heading][subheading], formElement);
                        break;
                    case "string":
                        if (schemaEntry.imgPaths === undefined) {
                            SettingsForm.editStringSchemaEntry(heading, subheading, schemaEntry, settings[heading][subheading], formElement);
                        } else {
                            SettingsForm.updateImgSelectElement(heading, subheading, schemaEntry, settings[heading][subheading], formElement);
                        }
                        break;
                    default:
                        throw new Error("Schema Error: Unknown type: " + schemaEntry.type);
                }
            }
        }

        if (settings.teachersMode) {
            for (let heading in schema) {
                let subSettings = schema[heading].properties;
                for (let subheading in subSettings) {
                    let inputElement = $("input[name='teachers." + heading + "." + subheading + "']")[0];
                    inputElement.checked = settings.visibility.isVisible(heading, subheading);
                }
            }
        }

        let currentLanguage = settings.general.language;
        // FIXME
        schema.general.properties.language.default = currentLanguage === baseConfigs.languages.ENGLISH ? "en" : "de";
    }

    static editBooleanSchemaEntry(heading, key, value, formElement) {
        let name = heading + "." + key;
        let inputElement = $(formElement).find("input[name='" + name + "']")[0];
        inputElement.checked = value;
    }

    static editInputSchemaEntry(heading, key, value, formElement) {
        let name = heading + "." + key;
        let inputElement = $(formElement).find("input[name='" + name + "']")[0];
        inputElement.value = value;
    }

    static editStringSchemaEntry(heading, key, schemaEntry, selectedValue, formElement) {
        let selectName = heading + "." + key;
        let enumText = schemaEntry.enumText;
        if (enumText === undefined) {
            throw new Error("No enumText defined");
        }
        let selectElement = $(formElement).find("select[name='" + selectName + "']")[0];
        if (!(selectElement.options.length === enumText.length)) {
            throw new Error("Number of elements does not match number of texts specified in enumText");
        }

        if (heading === "general" && key === "language") {
            selectedValue = selectedValue === baseConfigs.languages.ENGLISH ? "en" : "de";
        }

        let selectedOption = null;
        for (let i = 0; i < selectElement.options.length; i++) {
            let option = selectElement.options[i];
            if (option.value === selectedValue) {
                selectedOption = option;
            }
        }
        selectedOption.selected = true;
    }

    static updateImgSelectElement(heading, key, schemaEntry, selectedValue, formElement) {
        if (heading === "general" && key === "language") {
            selectedValue = selectedValue === baseConfigs.languages.ENGLISH ? "en" : "de";
        }

        let divName = heading + "." + key;
        let enumText = schemaEntry.enumText;
        if (enumText === undefined) {
            throw new Error("No enumText defined");
        }
        let divElement = $(formElement).find("div[name='" + divName + "']")[0];
        // TODO: check for error in number of images
        // if (!(divElement.chil.length === enumText.length)) {
        //    throw new Error("Number of elements does not match number of texts specified in enumText");
        //}

        divElement.value = selectedValue;

        divElement.childNodes.forEach(childNode => childNode.classList.remove("selected"));

        let selectedEnum = schemaEntry.enum.findIndex(enumEntry => enumEntry === selectedValue);
        let selectedChild = divElement.childNodes[selectedEnum];

        if (selectedChild.classList.contains("selected")) {
            selectedChild.classList.remove("selected");
        } else {
            selectedChild.classList.add("selected");
        }
    }
}

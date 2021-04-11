class SettingsParser {

    // --- --- --- Seed To Settings --- --- ---
    /**
     * Uses schema and seed to generate settings object
     * @param schema
     * @param seed
     */
    static parseSettingsFromSeed(schema, seed) {
        let settings = {};

        let lastElement;

        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            settings[heading] = {};
            let settingsEntry = settings[heading];
            for (let key in subSettings) {
                let schemaEntry = subSettings[key];

                switch (schemaEntry.type) {
                    case "string":
                        lastElement = SettingsParser.parseStringFromSeed(schemaEntry, seed, settingsEntry, key);
                        break;
                    case "number":
                        lastElement = SettingsParser.parseNumberFromSeed(schemaEntry, seed, settingsEntry, key);
                        break;
                    case "integer":
                        lastElement = SettingsParser.parseIntegerFromSeed(schemaEntry, seed, settingsEntry, key);
                        break;
                    case "boolean":
                        lastElement = SettingsParser.parseBooleanFromSeed(schemaEntry, seed, settingsEntry, key);
                        break;
                    case "array":
                    case "object":
                        throw new Error("Unsupported type: " + schemaEntry.type);
                    default:
                        throw new Error("Unknown type: " + schemaEntry.type);
                }

                seed = seed.substr(lastElement + 1, seed.length);
            }
        }

        return settings;
    }

    static parseBooleanFromSeed(schemaEntry, seed, settings, key) {
        settings[key] = seed[0] === "1";
        return 0;
    }

    static parseStringFromSeed(schemaEntry, seed, settings, key) {
        let numOfDigits = SettingsParser.getNumOfDigits(schemaEntry.enum.length);
        let subStr = seed.substr(0, numOfDigits);
        let index = parseInt(subStr);
        settings[key] = schemaEntry.enum[index];
        return numOfDigits - 1;
    }

    static parseIntegerFromSeed(schemaEntry, seed, settings, key) {
        let minimum = schemaEntry.minimum;
        let maximum = schemaEntry.maximum;
        let numOfDigits = SettingsParser.getNumOfDigits(maximum - minimum);
        let subStr = seed.substr(0, numOfDigits);
        let seedValue = parseInt(subStr);
        settings[key] = seedValue + minimum;
        return numOfDigits - 1;
    }

    static parseNumberFromSeed(schemaEntry, seed, settings, key) {
        let minimum = schemaEntry.minimum;
        let maximum = schemaEntry.maximum;

        let numOfPreDecimals = SettingsParser.getNumOfDigits(maximum - minimum);
        let numOfDecimals = schemaEntry.decimals;
        let entryLength = numOfPreDecimals + numOfDecimals;
        let subStr = seed.substr(0, entryLength);

        if (numOfDecimals > 0) {
            let valueStr = SettingsParser.insertCharAtPosition(subStr, ".", numOfPreDecimals);
            settings[key] = parseFloat(valueStr) + minimum;
        } else {
            settings[key] = parseInt(subStr) + minimum;
        }

        return entryLength - 1;
    }

    static insertCharAtPosition(strA, strB, pos) {
        return [strA.slice(0, pos), strB, strA.slice(pos)].join('');
    }

    // --- --- --- Settings To Seed --- --- ---
    /**
     * Takes as input the settings schema and an actual instance and returns a seed
     * @param schema
     * @param settings
     */
    static parseSettingsToSeed(schema, settings) {
        let seed = "";

        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            for (let key in subSettings) {
                let schemaEntry = subSettings[key];
                let settingsValue = settings[heading][key];

                switch (schemaEntry.type) {
                    case "string":
                        seed += SettingsParser.parseStringToSeed(schemaEntry, settingsValue);
                        break;
                    case "number":
                        seed += SettingsParser.parseNumberToSeed(schemaEntry, settingsValue);
                        break;
                    case "integer":
                        seed += SettingsParser.parseIntegerToSeed(schemaEntry, settingsValue);
                        break;
                    case "boolean":
                        seed += SettingsParser.parseBooleanToSeed(schemaEntry, settingsValue);
                        break;
                    case "array": case "object":
                        throw new Error("Unsupported type: " + schemaEntry.type);
                    default:
                        throw new Error("Unknown type: " + schemaEntry.type);
                }
            }
        }

        return seed;
    }

    static parseStringToSeed(schemaEntry, settingsValue) {
        let possibleValues = schemaEntry.enum;
        if (possibleValues === undefined) {
            throw new Error("Parse Error: settings schema entry " + schemaEntry + " is of type string but doesn't have a minimum entry");
        }
        return possibleValues.findIndex(v => v === settingsValue);
    }

    static parseNumberToSeed(schemaEntry, settingsValue) {
        let minimum = schemaEntry.minimum;
        if (minimum === undefined) {
            throw new Error("Settings schema entry " + schemaEntry + " is of type number but doesn't have a minimum entry");
        }
        let maximum = schemaEntry.maximum;
        if (maximum === undefined) {
            throw new Error("Settings schema entry " + schemaEntry + " is of type number but doesn't have a maximum entry");
        }
        let numOfDecimals = schemaEntry.decimals;
        if (numOfDecimals === undefined) {
            throw new Error("Settings schema entry " + schemaEntry + " is of type number but doesn't have a maximum decimals");
        }

        let seedValue = settingsValue - minimum;

        return seedValue.toFixed(numOfDecimals).split(".").join("");
    }

    static parseIntegerToSeed(schemaEntry, settingsValue) {
        let minimum = schemaEntry.minimum;
        if (minimum === undefined) {
            throw new Error("Settings schema entry " + schemaEntry + " is of type integer but doesn't have a minimum entry");
        }
        let maximum = schemaEntry.maximum;
        if (maximum === undefined) {
            throw new Error("Settings schema entry " + schemaEntry + " is of type integer but doesn't have a maximum entry");
        }
        return settingsValue - minimum;
    }

    static parseBooleanToSeed(schemaEntry, settingsValue) {
        return settingsValue === true ? 1 : 0;
    }

    // --- --- --- Compare Settings Object --- --- ---
    static compareSettings(schema, settingsA, settingsB) {
        let result = [];

        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            for (let key in subSettings) {
                if (!(settingsA[heading][key] === settingsB[heading][key])) {
                    result.push({
                        heading: heading,
                        key: key
                    });
                }
            }
        }
        return result;
    }

    // --- --- --- Helper --- --- ---
    static getNumOfDigits(number) {
        return Math.floor(Math.log10(number) + 1);
    }
}

if (typeof module != 'undefined') {
    module.exports = SettingsParser;
}

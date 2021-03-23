class SettingsParser {

    /**
     * Uses schema and seed to generate settings object
     * @param schema
     * @param seed
     */
    static parseSettingsFromSeed(schema, seed) {
        let settings = {};

        let i = 0;
        let currentChar = seed[i];

        for (let key in schema) {
            let schemaEntry = schema[key];

            switch (schemaEntry.type) {
                case "string":
                    console.log("found string");
                    break;
                case "number":
                    console.log("found number");
                    break;
                case "integer":
                    console.log("found integer");
                    break;
                case "boolean":
                    if (seed[0] === "1") {
                        settings[key] = true;
                    } else if (seed[0] === "0") {
                        settings[key] = false;
                    } else {
                        throw new Error("Boolean parse error with entry: " + key + ": " + seed[0]);
                    }
                    seed.slice(0, 1);
                    console.log("found boolean");
                    break;
                case "array": case "object":
                    throw new Error("Unsupported type: " + schemaEntry.type);
                default:
                    throw new Error("Unknown type: " + schemaEntry.type);
            }

            i++;
        }

        return settings;
    }

    /**
     * Takes as input the settings schema and an actual instance and returns a seed
     * @param schema
     * @param settings
     */
    static parseSettingsToSeed(schema, settings) {
        let seed = "";

        for (let key in schema) {
            let schemaEntry = schema[key];
            let settingsValue = settings[key];

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

    // --- --- --- Helper --- --- ---
    static getNumOfDigits(number) {
        return Math.floor(Math.log10(number) + 1);
    }
}

if(typeof module != 'undefined') {
    module.exports = SettingsParser;
}

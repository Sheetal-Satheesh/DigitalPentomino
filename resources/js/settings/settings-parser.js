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
     * @param values
     */
    static parseSettingsToSeed(schema, values) {
        let seed = "";

        for (let key in schema) {
            let schemaEntry = schema[key];

            switch (schemaEntry.type) {
                case "string":
                    seed += values[key];
                    break;
                case "number":
                    console.log("found number");
                    break;
                case "integer":
                    console.log("found integer");
                    break;
                case "boolean":
                    seed += values[key] === true ? 1 : 0;
                    break;
                case "array": case "object":
                    throw new Error("Unsupported type: " + schemaEntry.type);
                default:
                    throw new Error("Unknown type: " + schemaEntry.type);
            }
        }

        return seed;
    }
}

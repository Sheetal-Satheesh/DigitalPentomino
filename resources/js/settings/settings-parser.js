class SettingsParser {

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
                case "boolean":
                    seed += values[key] === true ? 1 : 0;
                    break;
                case "enum":
                    console.log("found enum");
                    break;
                default:
                    throw new Error("Unknown type: " + schemaEntry.type);
            }
        }

        return seed;
    }
}

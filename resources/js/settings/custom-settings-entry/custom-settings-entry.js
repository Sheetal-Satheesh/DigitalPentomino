class CustomSettingsEntry {
    constructor(heading, subheading) {
        this._name = heading + "." + subheading;
    }

    create(settingsEntry) {
        throw new Error("This function should be overwritten");
    }

    collect(formElement) {
        throw new Error("This function should be overwritten");
    }

    update(heading, subheading, schemaEntry, selectedValue, formElement) {
        throw new Error("This function should be overwritten");
    }

    parseSettingsToSeed(schemaEntry, settingsValue) {
        throw new Error("This function should be overwritten");
    }

    parseFromSeed(schemaEntry, remainingSeed, settingsEntry, key, seed) {
        throw new Error("This function should be overwritten");
    }

    getName() {
        return this._name;
    }
}

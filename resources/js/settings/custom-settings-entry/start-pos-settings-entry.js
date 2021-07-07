class StartPosSettingsEntry extends CustomSettingsEntry {
    constructor() {
        super("boardCustomization", "initialPiecePos");
    }

    create(settingsEntry) {
        return document.createTextNode("TODO - implement me");
    }

    collect(formElement) {
        return undefined;
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
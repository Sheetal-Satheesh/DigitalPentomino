class CustomSettingsEntry {
    constructor(heading, subheading) {
        this._name = heading + "." + subheading;
    }

    create();

    collect();

    update(heading, subheading, schemaEntry, selectedValue, formElement);

    getName() {
        return this._name;
    }
}

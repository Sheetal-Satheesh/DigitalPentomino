const CustomSettingsEntrySingleton = (function () {
    let instance;

    function createInstance() {
        return new CustomSettingsEntryMaster();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

/**
 * A singleton which manages all custom setting entries. An entries can be added by registering a handlers in the
 * constructor. A handler is implemented by inheriting from the superclass {@link CustomSettingsEntry}.
 *
 * The singleton get be used anywhere to {@link #get} an entry by its respective name.
 */
class CustomSettingsEntryMaster {
    constructor() {
        this.customSettingsEntries = {};

        // register handlers
        this.addEntry(new StartPosSettingsEntry("boardCustomization", "initialPiecePos"));
    }

    addEntry(newEntry) {
        if (this.customSettingsEntries[newEntry.getName()] === undefined) {
            this.customSettingsEntries[newEntry.getName()] = newEntry;
        } else {
            console.error("Custom settings entry already defined: " + newEntry.getName());
        }
    }

    get(heading, subheading) {
        let name = SettingsForm.generateSettingsEntryName(heading, subheading);
        if (this.customSettingsEntries[name] === undefined) {
            console.error("Custom settings entry undefined: " + name);
        }

        return this.customSettingsEntries[name];
    }

    getAll() {
        return Object.values(this.customSettingsEntries);
    }
}

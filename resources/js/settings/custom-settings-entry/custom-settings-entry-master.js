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

class CustomSettingsEntryMaster {
    constructor() {
        this.customSettingsEntries = {};

        // register handlers
        this.addEntry(new StartPosSettingsEntry());
    }

    addEntry(newEntry) {
        if (!(this.customSettingsEntries[newEntry.getName()] === undefined)) {
            this.customSettingsEntries[newEntry.getName()] = newEntry;
        } else {
            console.error("Custom settings entry already defined: " + newEntry.getName());
        }
    }

    get(heading, subheading) {
        let name = heading + "." + subheading;
        if (this.customSettingsEntries[name] === undefined) {
            console.error("Custom settings entry undefined: " + name);
        }

        return this.customSettingsEntries[name];
    }
}
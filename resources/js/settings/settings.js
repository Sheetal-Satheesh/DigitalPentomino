const SettingsSingleton = (function () {
    let instance;

    function createInstance() {
        return new Settings();
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

class Settings {
    constructor() {
        let urlParams = new URLSearchParams(window.location.search);
        let querySeed = urlParams.get('seed');
        let schema = SettingsSchemaSingleton.getInstance().createSchema();
        if (querySeed === null) {
            this._settings = SettingsParser.createDefaultSettingsObject(schema);
        } else {
            this._settings = SettingsParser.parseSettingsFromSeed(schema, querySeed);
            if (this._settings === null) {
                // TODO: Handle invalid seed
                this._settings = SettingsParser.createDefaultSettingsObject(schema);
            }
        }
    }

    setSettings(settings) {
        let schema = SettingsSchemaSingleton.getInstance().getSettingsSchema();
        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            this._settings[heading] = {};
            for (let key in subSettings) {
                this._settings[heading][key] = settings[heading][key];
            }
        }
    }

    getSettings() {
        return this._settings;
    }

    static isVisible(visibility, heading, subheading) {
        if (subheading === undefined && visibility[heading] === undefined) {
            throw new Error("Unknown settings heading: " + heading);
        }

        if (subheading === undefined) return visibility[heading] === true;

        if (visibility[heading + "." + subheading] === undefined) {
            throw new Error("Unknown settings entry: " + heading + "." + subheading);
        }

        return visibility[heading + "." + subheading] === true;
    }
}

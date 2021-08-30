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
        let querySeed = urlParams.get(baseConfigs.seedUrlParamName);
        let schema = SettingsSchemaSingleton.getInstance().createSchema();
        if (querySeed === null) {
            console.info("Url param seed not found. Use default settings object");
            this._settings = SettingsParser.createDefaultSettingsObject(schema);
        } else {
            this._settings = SettingsParser.parseSettingsFromSeed(schema, querySeed);
            if (this._settings === null) {
                console.error("Invalid seed. Use default settings object");
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
        this._settings.visibility = jQuery.extend(true, new SettingsVisibility(), settings.visibility);
    }

    getSettings() {
        return this._settings;
    }
}

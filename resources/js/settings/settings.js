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
        this._settings = this.createDefaultSettingsObject();
    }

    createDefaultSettingsObject() {
        let settings = {};
        let schema = SettingsSchemaSingleton.getInstance().createSchema();
        for (let heading in schema) {
            let subSettings = schema[heading].properties;
            settings[heading] = {};
            for (let key in subSettings) {
                settings[heading][key] = schema[heading].properties[key].default;
            }
        }
        settings.general.language = baseConfigs.defaultLanguage;
        return settings;
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
}
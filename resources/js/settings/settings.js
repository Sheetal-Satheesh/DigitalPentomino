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
    setSeed(seed) {
        this._seed = seed;
    }

    getSeed() {
        return this._seed;
    }

    setSettings(settings) {
        this._settings = settings;
    }

    getSettings() {
        return this._settings;
    }
}

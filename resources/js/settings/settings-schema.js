/** RULES
 *  - entries of type string only with enum specified
 *  - number entries only with minimum and maximum specified
 *  - Only depth of one supported
 *  - Numbers must contain an entry 'decimals', which specifies the number of decimals
 *  - Default attribute is mandatory
 *  - Texts of enums can be defined with the enumText attribute
 */

const SettingsSchemaSingleton = (function () {
    let instance;

    function createInstance() {
        return new SettingsSchema();
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

class SettingsSchema {
    constructor() {
        this._language = baseConfigs.defaultLanguage;
        this._schema = this.createSchema();
    }

    getSettingsSchema() {
        if (this._language === SettingsSingleton.getInstance().getSettings().general.language) {
            return this._schema;
        } else {
            this._language = SettingsSingleton.getInstance().getSettings().general.language;
            return this.createSchema();
        }
    }

    createSchema() {
        let lang = this._language;
        let titles = strings.settings;

        return this._schema = {
            general: {
                "type": "object",
                "title": titles.general.title[lang],
                "properties": {
                    language: {
                        "type": "string",
                        "title": titles.general.language.title[lang],
                        "enum": ["en", "de"],
                        "enumText": titles.general.language.enumTitles[lang],
                        "default": "en"
                    }
                }
            },
            ui: {
                "type": "object",
                "title": titles.ui.title[lang],
                "properties": {
                    enablePentominoButtonsOnLeftPanel: {
                        "type": "boolean",
                        "title": titles.ui.enablePentominoButtonsOnLeftPanel[lang],
                        "default": true
                    }
                }
            },
            hinting: {
                "type": "object",
                "title": titles.hinting.title[lang],
                "properties": {
                    enableHinting: {
                        "type": "boolean",
                        "title": titles.hinting.enableHinting[lang],
                        "default": true
                    },
                    hintingStrategy: {
                        "type": "string",
                        "title": titles.hinting.hintingStrategy.title[lang],
                        "enum": ["full","partial","area"],
                        "enumText": titles.hinting.hintingStrategy.enumTitles[lang],
                        "default": "full"
                    },
                    skillTeaching: {
                        "type": "boolean",
                        "title": titles.hinting.skillTeaching[lang],
                        "default": true
                    },
                    exactHints: {
                        "type": "boolean",
                        "title": titles.hinting.exactHints[lang],
                        "default": false
                    },
                    indicateDestinationPosition: {
                        "type": "boolean",
                        "title": titles.hinting.indicateDestinationPosition[lang],
                        "default": true
                    },
                    indicateDestination: {
                        "type": "boolean",
                        "title": titles.hinting.indicateDestination[lang],
                        "default": true
                    }
                }
            },
            prefilling: {
                "type": "object",
                "title": titles.prefilling.title[lang],
                "properties": {
                    enablePrefilling: {
                        "type": "boolean",
                        "title": titles.prefilling.enablePrefilling[lang],
                        "default": true
                    },
                    prefillingStrategy: {
                        "type": "string",
                        "title": titles.prefilling.prefillingStrategy.title[lang],
                        "enum": ["distance", "pieces"],
                        "enumText": titles.prefilling.prefillingStrategy.enumTitles[lang],
                        "default": "distance"
                    },
                    distanceValue: {
                        "step": 1,
                        "type": "integer",
                        "title": titles.prefilling.distanceValue[lang],
                        "default": 2,
                        "minimum": 1,
                        "exclusiveMinimum": true,
                        "maximum": 10
                    }
                }
            }
        };
    }
}


//Multilanguage via variable:
//let language = "de";
//
//title = {
//    "en": "Hinting Strategy",
//    "de": "Hinting Strategie"
//}
//title[language],

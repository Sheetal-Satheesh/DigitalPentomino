/** RULES
 *  - entries of type string only with enum specified
 *  - number entries only with minimum and maximum specified
 *  - Only depth of one supported
 *  - Numbers must contain an entry 'decimals', which specifies the number of decimals
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
        this._language = "en";
        this._dirty = true;
    }

    setLanguage(language) {
        if (!(this._language === language)) {
            this._dirty = true;
        }

        this._language = language;
    }

    getLanguage() {
        return this._language;
    }

    getSettingsSchema() {
        if (this._dirty === false) {
            return this._schema;
        } else {
            this._dirty = false;
            return this.createSchema();
        }
    }

    createSchema() {

        let lang = this._language === "en" ? 0 : 1;
        let titles = {
            general: {
                title: ["General", "Allgemein"],
                language: {
                    title: ["Language", "Sprache"],
                    enumTitles: [["English", "German"], ["Englisch", "Deutsch"]]
                }
            },
            hinting: {
                title: ["Hints", "Hinweise"],
                enableHinting: ["Enable hints", "Hinweise einschalten"],
                hintingStrategy: {
                    title: ["Hint-Strategy", "Strategie der Hinweise"],
                    enumTitles: [["Full", "Partial"], ["Voll", "Partiell"]]
                },
                skillTeaching: ["Enable Skill-Teaching?", "Fähigkeits-lehrende Hinweise einschalten?"],
                indicateDestinationPosition: ["Enable indication of pentomino position?", "Anzeigen der Pentomino-Position einschalten"],
                indicateDestination: ["Enalbe indication of pentomino piece?", "Anzeigen des Pentominos einschalten?"]
            },
            prefilling: {
                title: ["Prefilling", "Automatisches Füllen"],
                enablePrefilling: ["Enable Prefilling?", "Automatisches Füllen einschalten"],
                prefillingStrategy: {
                    title: ["Prefill-Strategy", "Automatisches Füllen-Stragie"],
                    enumTitles: [["Distance"], ["Distanz"]]
                },
                distanceValue: ["Distance value", "Distanz Wert"]
            }
        };

        return this._schema = {
            general: {
                "type": "object",
                "title": titles.general.title[lang],
                "properties": {
                    language: {
                        "type": "string",
                        "title": titles.general.language.title[lang],
                        "enum": ["en", "de"],
                        "enumText": titles.general.language.enumTitles[lang]
                    }
                }
            },
            hinting: {
                "type": "object",
                "title": titles.hinting.title[lang],
                "properties": {
                    enableHinting: {
                        "type": "boolean",
                        "title": titles.hinting.enableHinting[lang]
                    },
                    hintingStrategy: {
                        "type": "string",
                        "title": titles.hinting.hintingStrategy.title[lang],
                        "enum": ["full","partial"],
                        "enumText": titles.hinting.hintingStrategy.enumTitles[lang]
                    },
                    skillTeaching: {
                        "type": "boolean",
                        "title": titles.hinting.skillTeaching[lang],
                    },
                    indicateDestinationPosition: {
                        "type": "boolean",
                        "title": titles.hinting.indicateDestinationPosition[lang],
                    },
                    indicateDestination: {
                        "type": "boolean",
                        "title": titles.hinting.indicateDestination[lang],
                    }
                }
            },
            prefilling: {
                "type": "object",
                "title": titles.prefilling.title[lang],
                "properties": {
                    enablePrefilling: {
                        "type": "boolean",
                        "title": titles.prefilling.enablePrefilling[lang]
                    },
                    prefillingStrategy: {
                        "type": "string",
                        "title": titles.prefilling.prefillingStrategy.title[lang],
                        "enum": ["distance"],
                        "enumText": titles.prefilling.prefillingStrategy.enumTitles[lang]
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

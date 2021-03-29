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
        return this._schema = {
            hinting: {
                "type": "object",
                "title": "Hinting",
                "properties": {
                    hintingStrategy: {
                        "type": "string",
                        "title": "hintingStrategy",
                        "enum": ["full","partial"]
                    },
                    skillTeaching: {
                        "type": "boolean",
                        "title": "Skill Teaching hints?",
                    },
                    indicateDestinationPosition: {
                        "type": "boolean",
                        "title": "Indication of Destination positions?",
                    },
                    indicateDestination: {
                        "type": "boolean",
                        "title": "Indication of pentomino?",
                    }
                }
            },
            prefilling: {
                "type": "object",
                "title": "Prefilling",
                "properties": {
                    prefillingStrategy: {
                        "type": "string",
                        "title": "prefillingStrategy",
                        "enum": ["distance"]
                    },
                    distanceValue: {
                        "step": 1,
                        "type": "integer",
                        "title": "How much distance between pieces?",
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

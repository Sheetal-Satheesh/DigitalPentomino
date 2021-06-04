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
                        "default": "de"
                    }
                }
            },
            theming: {
                "type": "object",
                "title": titles.theming.title[lang],
                "properties": {
                    theme: {
                        "type": "string",
                        "title": titles.theming.theme.title[lang],
                        "description": titles.theming.theme.description[lang],
                        "enum": ["theme1", "theme2", "theme3", "theme4"],
                        "enumText": titles.theming.theme.enumTitles[lang],
                        "default": "theme1"
                    },
                }
            },
            hinting: {
                "type": "object",
                "title": titles.hinting.title[lang],
                "properties": {
                    showNumberOfPossibleSolutions: {
                        "type": "boolean",
                        "title": titles.hinting.showNumberOfPossibleSolutions.title[lang],
                        "description": titles.hinting.showNumberOfPossibleSolutions.description[lang],
                        "default": true
                    },
                    enableHinting: {
                        "type": "boolean",
                        "title": titles.hinting.enableHinting.title[lang],
                        "description": titles.hinting.enableHinting.description[lang],
                        "default": true
                    },
                    hintingStrategy: {
                        "type": "string",
                        "title": titles.hinting.hintingStrategy.title[lang],
                        "description": titles.hinting.hintingStrategy.description[lang],
                        "enum": ["full","partial","area"],
                        "enumText": titles.hinting.hintingStrategy.enumTitles[lang],
                        "default": "partial"
                    },
                    partialHintingStragety: {
                        "type": "string",
                        "title": titles.hinting.partialHintingStrategy.title[lang],
                        "description": titles.hinting.partialHintingStrategy.description[lang],
                        "enum": ["random","mostOccupiedCells"],
                        "enumText": titles.hinting.partialHintingStrategy.enumTitles[lang],
                        "default": "mostOccupiedCells"
                    },
                    maxPartialHintingCells: {
                        "step": 1,
                        "type": "integer",
                        "title": titles.hinting.maxPartialHintingCells.title[lang],
                        "description": titles.hinting.maxPartialHintingCells.description[lang],
                        "default": 1,
                        "minimum": 1,
                        "exclusiveMinimum": false,
                        "maximum": 4
                    },
                    skillTeaching: {
                        "type": "boolean",
                        "title": titles.hinting.skillTeaching.title[lang],
                        "description": titles.hinting.skillTeaching.description[lang],
                        "default": true
                    },
                    exactHints: {
                        "type": "boolean",
                        "title": titles.hinting.exactHints.title[lang],
                        "description": titles.hinting.exactHints.description[lang],
                        "default": false
                    }
                }
            },


            showSolvedBoardScreen: {
                "type": "object",
                "title": titles.showSolvedBoardScreen.title[lang],
                "properties":{
                    enableSolvedScreen: {
                        "type": "boolean",
                        "title": titles.showSolvedBoardScreen.enableSolvedScreen.title[lang],
                        "description": titles.showSolvedBoardScreen.enableSolvedScreen.description[lang],
                        "default": true
                    },
                    SolvedScreens:{
                         "type": "string",
                        "title": titles.showSolvedBoardScreen.SolvedScreens.title[lang],
                        "description": titles.showSolvedBoardScreen.SolvedScreens.description[lang],
                        "enum": ["Play again?", "Well done! Please wait for your Teacher to continue", "Excellent ! Now continue with the next task on your assignment"],
                        "enumText": titles.showSolvedBoardScreen.SolvedScreens.enumTitles[lang],
                        "enumText": titles.showSolvedBoardScreen.SolvedScreens.enumTitles[lang],
                        "default": "Play again?"
                    }
                }
            },

            prefilling: {
                "type": "object",
                "title": titles.prefilling.title[lang],
                "properties": {
                    enablePrefilling: {
                        "type": "boolean",
                        "title": titles.prefilling.enablePrefilling.title[lang],
                        "description": titles.prefilling.enablePrefilling.description[lang],
                        "default": true
                    },
                    prefillingStrategy: {
                        "type": "string",
                        "title": titles.prefilling.prefillingStrategy.title[lang],
                        "description": titles.prefilling.prefillingStrategy.description[lang],
                        "enum": ["distance", "pieces"],
                        "enumText": titles.prefilling.prefillingStrategy.enumTitles[lang],
                        "default": "distance"
                    },
                    distanceValue: {
                        "step": 1,
                        "type": "integer",
                        "title": titles.prefilling.distanceValue[lang],
                        "default": 3,
                        "minimum": 1,
                        "exclusiveMinimum": false,
                        "maximum": 10
                    }
                }
            }
        };
    }
}

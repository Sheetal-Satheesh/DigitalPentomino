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
        if(this._language == SettingsSingleton.getInstance().getSettings().general.language)
            return this._schema;
        else {
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
                "advanced": false,
                "pupilModeVisibleOnDefault": true,
                "properties": {
                    language: {
                        "type": "string",
                        "title": titles.general.language.title[lang],
                        "enum": ["en", "de"],
                        "enumText": titles.general.language.enumTitles[lang],
                        "imgPaths": ["resources/images/icons/flag_of_the_united_kingdom_200px.png",
                            "resources/images/icons/flag_of_germany_200px.png"],
                        "default": "en"
                    },
                    enableAudio: {
                        "type": "boolean",
                        "title": titles.general.enableAudio.title[lang],
                        "default": false,
                        "pupilModeVisibleOnDefault": false
                    },
                    enableBgMusic: {
                        "type": "boolean",
                        "title": titles.general.enableBgMusic.title[lang],
                        "default": false,
                        "pupilModeVisibleOnDefault": false
                    },
                    enableBird: {
                        "type": "boolean",
                        "title": titles.general.enableBird.title[lang],
                        "default": true,
                        "pupilModeVisibleOnDefault": true
                    },
                    hintingLevels: {
                        "type": "string",
                        "title": titles.hinting.hintingLevels.title[lang],
                        "description": titles.hinting.hintingLevels.description[lang],
                        "enum": ["Easy", "Medium", "Difficult", "Custom"],
                        "enumText": titles.hinting.hintingLevels.enumTitles[lang],
                        "default": "Easy",
                        "pupilModeVisibleOnDefault": false
                    },
                    enableAutoHinting:{
                      "type": "boolean",
                      "title": titles.autohinting.enableAutoHinting.title[lang],
                      "default": false,
                      "pupilModeVisibleOnDefault": true
                    },
                    initiateActionsIfUserNotActive:{
                      "type": "boolean",
                      "title": titles.autohinting.initiateActionsIfUserNotActive.title[lang],
                      "default": true,
                      "pupilModeVisibleOnDefault": true
                    }
                }
            },
            theming: {
                "type": "object",
                "title": titles.theming.title[lang],
                "advanced": false,
                "pupilModeVisibleOnDefault": true,
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
            showSolvedBoardScreen: {
                "type": "object",
                "title": titles.showSolvedBoardScreen.title[lang],
                "pupilModeVisibleOnDefault": false,
                "advanced": false,
                "properties": {
                    enableSolvedScreen: {
                        "type": "boolean",
                        "title": titles.showSolvedBoardScreen.enableSolvedScreen.title[lang],
                        "description": titles.showSolvedBoardScreen.enableSolvedScreen.description[lang],
                        "default": true
                    },
                    SolvedScreens: {
                        "type": "string",
                        "title": titles.showSolvedBoardScreen.SolvedScreens.title[lang],
                        "description": titles.showSolvedBoardScreen.SolvedScreens.description[lang],
                        "enum": ["Play again?", "Well done! Please wait for your Teacher to continue", "Excellent ! Now continue with the next task on your assignment"],
                        "enumText": titles.showSolvedBoardScreen.SolvedScreens.enumTitles[lang],
                        "default": "Play again?"
                    }
                }
            },
            autohinting: {
                "type": "object",
                "title": titles.autohinting.title[lang],
                "pupilModeVisibleOnDefault": false,
                "advanced": true,
                "properties": {
                  wakeUser:{
                    "type": "boolean",
                    "title": titles.autohinting.wakeUser.title[lang],
                    "description": titles.autohinting.wakeUser.description[lang],
                    "default": false
                  },

                  autoHintVariants:{
                    "type": "string",
                    "title": titles.autohinting.autoHintVariants.title[lang],
                    "enum": ["Time period", "Wrong moves"],
                    "enumText": titles.autohinting.autoHintVariants.enumTitles[lang],
                    "description": titles.autohinting.autoHintVariants.description[lang],
                    "default": "Wrong moves"
                  },

                  enableTimePeriodBasedAutoHintInAnyCase:{
                    "type": "boolean",
                    "title": titles.autohinting.enableTimePeriodBasedAutoHintInAnyCase.title[lang],
                    "description": titles.autohinting.enableTimePeriodBasedAutoHintInAnyCase.description[lang],
                    "default": false
                  },

                  numberOfWrongMoves: {
                      "step": 1,
                      "type": "integer",
                      "title": titles.autohinting.numberOfWrongMoves.title[lang],
                      "description": titles.autohinting.numberOfWrongMoves.description[lang],
                      "default": 5,
                      "minimum": 5,
                      "exclusiveMinimum": false,
                      "maximum": 20
                  },

                  timeForNoAction: {
                    "type": "string",
                    "title": titles.autohinting.timeForNoAction.title[lang],
                    "enum": ["Short", "Medium", "Long"],
                    "enumText": titles.autohinting.timeForNoAction.enumTitles[lang],
                    "description": titles.autohinting.timeForNoAction.description[lang],
                    "default": "Short"
                  },

                  typeOfHints:{
                    "type": "string",
                    "title": titles.autohinting.typeOfHints.title[lang],
                    "enum": ["Visual", "Textual", "Both"],
                    "enumText": titles.autohinting.typeOfHints.enumTitles[lang],
                    "description": titles.autohinting.typeOfHints.description[lang],
                    "default": "Visual"
                  }
                }
            },
            hinting: {
                "type": "object",
                "title": titles.hinting.title[lang],
                "pupilModeVisibleOnDefault": false,
                "advanced": true,
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
                        "enum": ["full", "partial", "area"],
                        "enumText": titles.hinting.hintingStrategy.enumTitles[lang],
                        "default": "partial"
                    },
                    partialHintingStragety: {
                        "type": "string",
                        "title": titles.hinting.partialHintingStrategy.title[lang],
                        "description": titles.hinting.partialHintingStrategy.description[lang],
                        "enum": ["random", "mostOccupiedCells"],
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
                    },
                    hintingVariants: {
                        "type": "string",
                        "title": titles.hinting.hintingVariants.title[lang],
                        "description": titles.hinting.hintingVariants.description[lang],
                        "enum": ["Show pentominoes", "Show destination", "Show both"],
                        "enumText": titles.hinting.hintingVariants.enumTitles[lang],
                        "default": "Show both"
                    }
                }
            },
            prefilling: {
                "type": "object",
                "advanced": true,
                "title": titles.prefilling.title[lang],
                "visible": false,
                "pupilModeVisibleOnDefault": false,
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
                        "type": "string",
                        "title": titles.prefilling.distanceValue.title[lang],
                        "default": "easy",
                        "enum": ["easy", "medium", "hard", "extreme"],
                        "enumText": [],
                        "_enumText": titles.prefilling.distanceValue.enumTitles
                    }
                }
            },
            splitPartition: {
                "type": "object",
                "advanced": true,
                "title": titles.splitPartition.title[lang],
                "visible": false,
                "pupilModeVisibleOnDefault": false,
                "properties": {
                    splitStrategy: {
                        "type": "string",
                        "title": titles.splitPartition.splitStrategy.title[lang],
                        "enum": ["color","left-to-right"],
                        "enumText": titles.splitPartition.splitStrategy.enumTitles[lang],
                        "default": "color"
                    }
                }
            }

        };
    }
}

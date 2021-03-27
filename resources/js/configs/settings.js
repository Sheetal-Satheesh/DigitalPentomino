settings = {
    hinting: {
        supportedHintingStrategies:["full","partial"],
        hintingStrategy:"partial", // f=full (full hints are given), p=partial (only partial hints are given)
        skillTeaching:"true", // 0=false (non-solvable positions are not indicated), 1=true (non-solvable situations are indicated on the board)
        indicateDestination:"true", // 0=false (destinations are not indicated on the board), 1=true (destinations are indicated on the board)
        indicatePentomino:"true" // 0=false (hint-related pentomino not highlighted on the board), 1=true (hint-related pentomino is highlighted on the board)
    },
    prefilling: {
        supportedPrefillingStrategies:["distance"],
        prefillingStrategy: "distance", // d=distance
        distanceValue: "2", // <number>: min. distance between two pieces according to prefilling strategy
        pieceLimit: "99" // <number>: maximum amount of pieces to be placed on the board
    }
    
};



// Example seeds:
//
// e.g. "partial hinting with skillTeaching enabled, indicating the Destination Posiitons and pentominos + 
//       distance-based prefilling with a minimum distance of 2 and maximum 5 pieces on the board":
// -->  Hp111Pd25 (seed for configuration)

const SettingsEntryType = {
    BOOL: 0,
    INT: 1,
    STRING: 2,
    ENUM: 3
};

/*settingsSchema = {
    hinting: {
        supportedHintingStrategies: {
            type: SettingsEntryType.ENUM,
            allowedValues: ["full","partial","another"],
            titleEn: "Supported Hinting Strategies",
            titleGe: "Unterstütze Hilf-Strategien"
        },
        skillTeaching: {
            type: SettingsEntryType.BOOL,
            titleEn: "Skill teaching",
            titleGe: "Fähigkeits-lehrender Unterricht"
        }, // 0=false (non-solvable positions are not indicated), 1=true (non-solvable situations are indicated on the board)
        indicateDestination: {
            type: SettingsEntryType.BOOL,
            titleEn: "Indicate Destionation",
            titleGe: ""
        }, // 0=false (destinations are not indicated on the board), 1=true (destinations are indicated on the board)
        indicatePentomino: {
            type: SettingsEntryType.BOOL,
            titleEn: "Indicate Pentomino",
            titleGe: ""
        } // 0=false (hint-related pentomino not highlighted on the board), 1=true (hint-related pentomino is highlighted on the board)
    },
    prefilling: {
        // ...
    }
};*/

/** RULES
 *  - entries of type string only with enum specified
 *  - number entries only with minimum and maximum specified
 *  - Only depth of one supported
 *  - Numbers must contain an entry 'decimals', which specifies the number of decimals
 */


settingsSchema = {
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


//Multilanguage via variable:
//let language = "de";
//
//title = {
//    "en": "Hinting Strategy",
//    "de": "Hinting Strategie"
//}
//title[language],

// --- --- --- Parser --- --- ---
// Input: seed and settings-schema-object
// Output: setting-object
// Generates setting-object based on settings-schema-object and populates it with values in seed

// --- --- --- UI --- --- ---
// Input: settings-schema-object
// Output: Settings-website
// (Website outputs on demand seed)

// Maybe help from https://github.com/jsonform/jsonform

// JSON-schema: http://json-schema.org/





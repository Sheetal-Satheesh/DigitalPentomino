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

let language = "de";

title = {
    "en": "Hinting Strategy",
    "de": "Hinting Strategie"
}

strategies = {
    "en": ["full","partial","another"],
    "de": ["vollständig","teilweise","andere"]
}

settingsSchema = {
    hintingStrategy: {
        "title": title[language],
        "description": "Please pick a hinting strategy",
        "type": "string",
        "enum": strategies[language]
      },
    skillTeaching: {
        type: 'boolean',
        title: 'Skill Teaching',
        decimals: 2
    }
};

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
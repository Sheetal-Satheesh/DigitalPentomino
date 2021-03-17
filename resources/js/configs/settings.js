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
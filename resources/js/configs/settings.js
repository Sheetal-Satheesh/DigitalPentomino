settings = {
    hinting: {
        supportedHintingStrategies:["full","simple"],
        hintingStrategy:"full",
        indicateDestination:"true",
        indicatePentomino:"true"
    },
    prefilling: {
        supportedPrefillingStrategies:["distance","center","fixed","edges"],
        prefillingStrategy: "distance",
        distance: {
            distanceValue: "2.2",
            pentoAmount: 5
        },
        center: {
            pentoAmount: 5
        },
        fixed: {
            relatedEdges: 2,
            pentoAmount: 5
        }
    }
};
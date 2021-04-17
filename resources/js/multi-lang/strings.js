const strings = {
    settings: {
        header: ["Game settings", "Spieleinstellungen"],
        buttons: {
            apply: ["Apply", "Bestätigen"],
            cancel: ["Cancel", "Abbrechen"]
        },
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
                enumTitles: [["Full", "Partial", "Area"], ["Voll", "Partiell", "Bereich"]]
            },
            skillTeaching: ["Enable Skill-Teaching?", "Fähigkeits-lehrende Hinweise einschalten?"],
            exactHints: ["Enable exact Hints?", "Exakte Hinweise aktivieren?"],
            indicateDestinationPosition: ["Enable indication of pentomino's destination position?", "Anzeigen der Pentomino-Zielposition einschalten"],
            indicatePentomino: ["Enable indication of pentomino piece?", "Anzeigen des Pentominos einschalten?"]
        },
        prefilling: {
            title: ["Prefilling", "Automatisches Füllen"],
            enablePrefilling: ["Enable Prefilling?", "Automatisches Füllen einschalten"],
            prefillingStrategy: {
                title: ["Prefill-Strategy", "Automatisches Füllen-Stragie"],
                enumTitles: [["Distance", "Pieces"], ["Distanz", "Teil"]]
            },
            distanceValue: ["Distance value", "Distanz Wert"]
        },
        errors: {
            lowerThanMin: ["The value is lower than the minimum", "Der Eintrag ist kleiner als der minimale Wert"],
            higherThanMax: ["The value is higher than the maximum", "Der Eintrag ist größer als der maximale Wert"]
        }
    }
};

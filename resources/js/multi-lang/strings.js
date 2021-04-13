const strings = {
    settings: {
        header: ["Game settings", "Spieleinstellungen"],
        buttons: {
            apply: ["Apply", "Bestätigen"],
            cancel: ["Cancel", "Abbrechen"]
        },
        ui: {
            title: ["User Interface", "Benutzeroberfläche"],
            enablePentominoButtonsOnLeftPanel: ["Enable pentomino buttons on left panel", "Pentomino-Buttons auf linker Seite einschalten?"]
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
            indicateDestinationPosition: ["Enable indication of pentomino position?", "Anzeigen der Pentomino-Position einschalten"],
            indicateDestination: ["Enable indication of pentomino piece?", "Anzeigen des Pentominos einschalten?"]
        },
        prefilling: {
            title: ["Prefilling", "Automatisches Füllen"],
            enablePrefilling: ["Enable Prefilling?", "Automatisches Füllen einschalten"],
            prefillingStrategy: {
                title: ["Prefill-Strategy", "Automatisches Füllen-Stragie"],
                enumTitles: [["Distance"], ["Distanz"]]
            },
            distanceValue: ["Distance value", "Distanz Wert"]
        },
        errors: {
            lowerThanMin: ["The value is lower than the minimum", "Der Eintrag ist kleiner als der minimale Wert"],
            higherThanMax: ["The value is higher than the maximum", "Der Eintrag ist größer als der maximale Wert"]
        }
    }
};

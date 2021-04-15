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
            enablePrefilling: {
                title: ["Enable Prefilling?", "Automatisches Füllen einschalten"],
                description: ["Prefilling fills the board randomly with pentominoes.>",
                    "Automatisches Füllen platziert zufällig Pentominoes auf das Spielfeld."]
            },
            prefillingStrategy: {
                title: ["Prefill-Constraint", "Automatisches Füllen-Einschränkung"],
                enumTitles: [["Distance", "Pieces"], ["Distanz", "Nachbar"]],
                description: ["The selected constraint is applied when the pentominoes are placed on the board: <ul><li><b>Distance-Constraint:</b> Pieces are not closer than the value specified in <i>Distance value</i>.</li><li><b>Pieces-Constraint:</b> Pieces are not touching more pieces than specified in <i>Distance value</i>.</li></ul>",
                    "Die Einschränkung muss eingehalten werden, wenn die Pentominoes auf dem Spielfeld platziert werden: <ul><li><b>Distanz-Einschränkung:</b> Distanz zwischen Pentominoes ist größer als <i>Distanz-Wert</i>.</li><li><b>Nachbar-Einschränkung:</b> Ein Pentomino hat weniger benachbarte Pentominoes als <i>Distanz-Wert</i>.</li></ul>"]
            },
            distanceValue: ["Distance value", "Distanz-Wert"]
        },
        errors: {
            lowerThanMin: ["The value is lower than the minimum", "Der Eintrag ist kleiner als der minimale Wert"],
            higherThanMax: ["The value is higher than the maximum", "Der Eintrag ist größer als der maximale Wert"]
        }
    }
};

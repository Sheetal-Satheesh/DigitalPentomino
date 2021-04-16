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
            enableHinting: {
                title: ["Enable hints", "Hinweise einschalten"],
                description: ["Hints suggest pentomino-actions to the user, which bring the board closer to a solution.",
                    "Hinweise schlagen dem Spieler Züge vor, die ihn/sie näher zur Lösung bringen."]
            },
            hintingStrategy: {
                title: ["Hint Type", "Art der Hinweise"],
                enumTitles: [["Concrete", "Partial", "Area"], ["Konkret", "Partiell", "Bereich"]],
                description: [
                    "Specifies what hints are given to the user:" +
                        "<ul>" +
                            "<li><b>Concrete Hints:</b> A hint suggests a specific action for a specific pentomino.</li>" +
                            "<li><b>Partial Hints:</b> An action is indicated by displaying cells of the pentomino in the desired state.</li>" +
                            "<li><b>Area Hints:</b> An action is indicated by displaying an area, where the pentomino should be placed.</li>" +
                        "</ul>",
                    "Spezifiziert, von welcher Art die Hinweise sind:" +
                        "<ul>" +
                            "<li><b>Konkrete Hinweise:</b> Der Hinweis empfiehlt direkt eine Aktion für ein bestimmtes Pentomino.</li>" +
                            "<li><b>Partielle Hinweise:</b> Die Aktion wird nur angedeutet, indem Zellen des Pentominoes an dessen Zielposition angezeigt werden.</li>" +
                            "<li><b>Bereich-Hinweise:</b> Die Aktion wird nur angedeutet, indem ein Bereich angezeigt wird, der die Zielposition des Pentominoes enthält.</li>" +
                        "</ul>"]
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
                description: ["Prefilling fills the board randomly with pentominoes.",
                    "Automatisches Füllen platziert zufällig Pentominoes auf das Spielfeld."]
            },
            prefillingStrategy: {
                title: ["Prefill-Constraint", "Automatisches Füllen-Einschränkung"],
                enumTitles: [["Distance", "Pieces"], ["Distanz", "Nachbar"]],
                description: [
                    "The selected constraint is applied when the pentominoes are placed on the board:" +
                        "<ul>" +
                            "<li><b>Distance-Constraint:</b> Pieces are not closer than the value specified in <i>Distance value</i>.</li>" +
                            "<li><b>Pieces-Constraint:</b> Pieces are not touching more pieces than specified in <i>Distance value</i>.</li>" +
                        "</ul>",
                    "Die Einschränkung muss eingehalten werden, wenn die Pentominoes auf dem Spielfeld platziert werden:" +
                        "<ul>" +
                            "<li><b>Distanz-Einschränkung:</b> Distanz zweier Pentominoes ist maximal der Wert spezifiziert in <i>Distanz-Wert</i>.</li>" +
                            "<li><b>Nachbar-Einschränkung:</b> Ein Pentomino hat maximal so viele benachbarte Pentominoes wie spezifiziert in <i>Distanz-Wert</i>.</li>" +
                        "</ul>"]
            },
            distanceValue: ["Distance value", "Distanz-Wert"]
        },
        errors: {
            lowerThanMin: ["The value is lower than the minimum", "Der Eintrag ist kleiner als der minimale Wert"],
            higherThanMax: ["The value is higher than the maximum", "Der Eintrag ist größer als der maximale Wert"]
        }
    }
};

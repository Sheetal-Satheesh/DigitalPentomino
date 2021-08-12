const strings = {
    general: {
        no: ["No", "Nein"],
        yes: ["Yes", "Ja"],
        cancel: ["cancel", "Abbrechen"]
    },
    reset: ["Do You Want To Reset?", "Willst du deinen Spielstand wirklich löschen?"],
    showSolved: {
        congrats: ["Congratulations!", "Glückwunsch!"],
        play: ["Play Again?", "Nochmal spielen?"],
        WellDone: ["Well done! Please wait for your Teacher to continue", "Gut gemacht! Bitte warten Sie auf Ihren Lehrer, um fortzufahren"],
        Excellent: ["Excellent ! Now continue with the next task on your assignment", "Ausgezeichnet! Fahren Sie jetzt mit der nächsten Aufgabe Ihres Auftrags fort"]
    },
    speechbubbleTexts: {
        Solved: ["Ya hoo !! You solved it !", "Juhu!! Du hast es gelöst!"]
    },
    numberOfPossibleSolutions: ["Number of solutions", "Anzahl Lösungen"],
    License: ["LICENSES", "LIZENZEN"],
    settings: {
        header: ["Game settings", "Spieleinstellungen"],
        advanced: {
            show: ["Show advanced settings", "Öffne erweiterte Einstellungen"],
            hide: ["Hide advanced settings", "Schließe erweiterte Einstellungen"]
        },
        buttons: {
            apply: ["Apply", "Bestätigen"],
            cancel: ["Cancel", "Abbrechen"]
        },
        general: {
            title: ["General", "Allgemein"],
            language: {
                title: ["Language", "Sprache"],
                enumTitles: [["English", "German"], ["Englisch", "Deutsch"]]
            },
            enableAudio: {
                title: ["Enable Audio", "Audio einschalten"]
            },
            enableBgMusic: {
                title: ["Enable Background Music", "Hintergrundmusik einschalten"]
            },
            enableBird: {
                title: ["Show tucan as helper", "Tucan als Helfer anzeigen"]
            }
        },
        license: {
            enumTitles: [["Name", "Name"], ["Author", "Autor"],["Link", "Link"], ["License", "Lizenz"]],
             solvedScreenMagician: ["Solved Screen Magician image", "Gelöstes Screen Magician-Bild"],
             solvedScreenBoy: ["Solved screen boy image", "Gelöster Bildschirm Junge Bild"],
             solvedScreenGift: ["Solved Screen Gift image", "Gelöst Bildschirm Geschenkbild"],
             backgroundMusic: ["Background Music", "Hintergrundmusik"],
             functionsMusic: ["Functions Music","Funktionen Musik"]
        },
        autohinting:{
            title: ["Auto hinting", "Automatisches Hinting"],
            wakeUser:{
              title: [["Wakeup the player if inactive"],["Wecken Sie den Spieler, wenn er inaktiv ist"]],
              description: ["Wakeup the player if inactive with a message",
              "Wecken Sie den Spieler bei Inaktivität mit ein nachrichten"]
            },

            enableAutoHinting:{
                title: ["Enable auto hinting", "Auto-Hinweis aktivieren"],
                description: [["Enables auto-hinting", "Aktiviert Auto-Hinting"]]
            },

            autoHintVariants:{
                title: ["Variants of auto-hinting", "Varianten von Auto-Hinting"],
                enumTitles: [["Time period", "Wrong moves"], ["Zeitspanne", "Falsche Züge"]],
                description: [
                "Provides automatic hints :"  +
                    "<ul>" +
                        "<li><b>Time period:</b> Auto-hinting based on the in-active player time</li>" +
                        "<li><b>Wrong moves:</b> Auto-hinting based on the number of wrong moves, here the user can only make 10 wrong moves</li>" +
                    "</ul>",
                    "Liefert automatische Hinweise :" +
                        "<ul>" +
                        "<li><b>Zeitspanne:</b> Automatisches Hinting basierend auf der Zeit des inaktiven Spielers</li>" +
                        "<li><b>Falsche Züge:</b> Auto-Hinweis basierend auf der Anzahl der falschen Züge, hier kann der Benutzer nur 10 falsche Züge machen</li>" +
                        "</ul>"]
            },

            numberOfWrongMoves: {
                title: ["Number of wrong moves", "Anzahl der falschen Züge"],
                  description: ["After how any number of wrong moves should the hint occur automatically",
                  "Nach einer beliebigen Anzahl von falschen Zügen sollte der Hinweis automatisch erfolgen"]
            },

            typeOfHints:{
                title: ["Type of hints for auto-hinting", "Art der Hinweise für das Auto-Hinting"],
                enumTitles: [["Visual", "Textual", "Both"], ["Visuell", "Textuell", "Beides"]],
                description: [
                "Provides automatic hints :"  +
                    "<ul>" +
                        "<li><b>Visual:</b> Gives only visual hints.</li>" +
                        "<li><b>Textual:</b> Gives only textual hints.</li>" +
                        "<li><b>Both:</b> Gives both visual and textual hints</li>" +
                    "</ul>",
                    "Liefert automatische Hinweise :" +
                        "<ul>" +
                        "<li><b>Visuell:</b> Gibt nur visuelle Hinweise.</li>" +
                        "<li><b>Textuell:</b> Gibt nur textuelle Hinweise.</li>" +
                        "<li><b>Beide:</b> Gibt sowohl visuelle als auch textliche Hinweise</li>" +
                        "</ul>"]
            }
        },
        hinting: {
            title: ["Hints (Experimental)", "Hinweise (Experimentell)"],
            enableHinting: {
                title: ["Enable hints", "Hinweise einschalten"],
                description: ["Hints suggest pentomino-actions to the user, which bring the board closer to a solution.",
                    "Hinweise schlagen dem Spieler Züge vor, die ihn/sie näher zur Lösung bringen."]
            },
            hintingLevels: {
                title: ["Levels", "Levels"],
                enumTitles: [["Easy", "Medium", "Difficult","Custom"], ["Leicht", "Mittel", "Schwierig", "Benutzerdefiniert"]],
                description: ["TODO",
                    "TODO"]
            },
            showNumberOfPossibleSolutions: {
                title: ["Show number of possible solutions", "Zeige Anzahl der möglichen Lösungen an"],
                description: ["Shows the number of solutions that contain the current pentominoes on the board.",
                    "Zeigt die Anzahl der Lösungen an, die mit den Pentominoes wie sie zu diesem Zeitpunkt auf dem Spielbrett liegen, möglich sind."]
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
            partialHintingStrategy: {
                title: ["Partial Hinting Strategy", "Partielle Hinweise Strategie"],
                enumTitles: [["Random", "Most Occupied Cells"], ["Zufällig", "Maximal belegte Felder"]],
                description: ["TODO",
                    "TODO"]
            },
            maxPartialHintingCells: {
                title: ["Max Partial Hinting Cells", "Maximale Anzahl Zellen bei partiellen Hinweisen"],
                description: ["If Partial hinting is enabled, the number of cells is randomly determined between 1 and the specified value.",
                    "Die Anzahl der Zellen, die bei partiellen Hinweisen angezeigt werden, ist zufällig zwischen 1 und er eingestellten Zahl."]
            },
            skillTeaching: {
                title: ["Enable Skill-Teaching?", "Fähigkeits-lehrende Hinweise einschalten?"],
                description: ["If skill-teaching is enabled, some hints are providing additional information to teach certain skills.",
                    "Wenn Fähigkeits-lehrende Hinweise eingeschaltet sind, werden manche bei manchen Hinweisen versucht, zusätzliche Fähigkeiten zu vermitteln."]
            },
            exactHints: {
                title: ["Enable exact Hints?", "Exakte Hinweise aktivieren?"],
                description: ["If enabled, Rotate, Flip and Move-actions that should be performed on one pentomino are three separate hints. Otherwise these actions are combined into one hint.",
                    "Aktiviert: Drehen, Spiegeln und Bewege-Aktionen, die auf ein Pentomino angewandt werden müssen sind drei separate Hinweise. Deaktiviert: Aktionen werden in einem Hinweis zusammengefasst."]
            },
            hintingVariants: {
                title: ["Hinting variants", "Hinweismöglichkeiten"],
                enumTitles: [
                    ["Show pentominoes", "Show destination", "Show both"],
                    ["Pentomino anzeigen", "Ziel anzeigen", "Beides anzeigen"]
                ],
                description: ["Hinting variants have different options:" +
                    "Show pentominoes: Hinting will only indicate pentomino to pickup" +
                    "Show destination: Hinting will indicate only destination to place pentomino" +
                    "Show both : Hinting will show both = pentomino to pickup and the detination to place",
                    "Hinting-Varianten haben verschiedene Optionen: " +
                    "Pentomino anzeigen: Hinting zeigt nur Pentomino zum Aufnehmen an " +
                    "Ziel anzeigen: Hinting zeigt nur das Ziel an, um Pentomino zu platzieren " +
                    "Beides anzeigen: Hinting zeigt beides an = Pentomino zum Aufnehmen und das Ziel zum Ablegen"
                ]

            }
        },
        showSolvedBoardScreen:{
                title: ["Show Solved Board Screen", "Bildschirm Gelöste Karte anzeigen"],
                enableSolvedScreen:{
                    title: ["Enable solved screen?", "Gelösten Bildschirm freigeben"],
                    description: ["Solved Board Screen indicates what should happen after the whole board is fully solved.",
                    "Der Bildschirm Gelöstes Board zeigt an, was passieren soll, nachdem das gesamte Board vollständig gelöst ist."]
                },
                SolvedScreens: {
                    title: ["Different solved screens", "Unterschiedlich gelöste Bildschirme"],
                    enumTitles: [["Play again?", "Well done! Please wait for your Teacher to continue", "Excellent ! Now continue with the next task on your assignment"],
                                ["Noch einmal spielen?", "Gut gemacht! Bitte warten Sie auf Ihren Lehrer, um fortzufahren", "Ausgezeichnet! Fahren Sie jetzt mit der nächsten Aufgabe Ihres Auftrags fort"]],
                    description: [
                    "The selected board is applied when the game is fully solved"+
                    "<ul>" +
                    "<li><b>Play again?:</b>Asking the students to play the game again with options<i>yes or no </i>.</li>" +
                    "<li><b>Well done! Please wait for your Teacher to continue:</b>Asking the students to wait for the teacher to continue</li>" +
                    "<li><b>Excellent ! Now continue with the next task on your assignment:</b>Asking the students to continue their next assignment</li>"+
                    "</ul>",
                    "Das gewählte Brett wird angewendet, wenn das Spiel vollständig gelöst ist "+
                    "<ul>" +
                    "<li><b>Noch einmal spielen?:</b>Aufforderung an die Schüler, das Spiel noch einmal zu spielen, mit den Optionen<i>ja oder nein</i>.</li>" +
                    "<li><b>Gut gemacht! Bitte warten Sie auf den Lehrer, um fortzufahren:</b>Aufforderung an die Schüler, auf den Lehrer zu warten, um fortzufahren</li>" +
                    "<li><b>Exzellent! Fahren Sie jetzt mit der nächsten Aufgabe Ihres Auftrags fort:</b>Aufforderung an die Schüler, mit der nächsten Aufgabe fortzufahren</li>"+
                    "</ul>"]
                }
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
            distanceValue: {
                title: ["Distance value", "Distanz-Wert"],
                enumTitles: {
                    distance: [["2"], ["3"], ["4"], ["5"]],
                    pieces: [["3"], ["2"], ["1"], ["0"]]
                }
            }
        },
        theming: {
            title: ["Application theme", "Applikationsdesign"],
            theme: {
                title: ["Choose a theme", "Wähle ein Design"],
                enumTitles: [["Default", "DayTuca", "NightTuca", "HighContrast"], ["Standard", "TucaHell", "TucaDunkel", "Kontrast"]],
                description: ["General theme of the application.", "Grundlegendes Design der Applikation"]
            }
        },
        errors: {
            lowerThanMin: ["This shouldn't be smaller than", "Dieser Eintrag darf nicht kleiner sein als"],
            higherThanMax: ["This shouldn't be greater than", "Dieser Eintrag darf nicht größer sein als"],
            numberBadInput: ["Please enter a number", "Bitte geben Sie eine Zahl ein"]
        }
    }
};

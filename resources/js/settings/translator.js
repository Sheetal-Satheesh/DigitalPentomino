class Translator{

    static translateHeaders(language){
        //simple replacement of headers to language
        switch (language) {
            case "de":
                document.getElementById("header-game-settings") ? document.getElementById("header-game-settings").textContent = 'Spieleinstellungen' : console.log("Translation element nicht gefunden.");
                document.getElementById("settings-submit-button") ? document.getElementById("settings-submit-button").value = 'Bestätigen' : console.log("Translation element nicht gefunden.");
                document.getElementById("settings-close-button") ? document.getElementById("settings-close-button").value = 'Abbrechen' : console.log("Translation element nicht gefunden.");
                break;
            case "en":
                document.getElementById("header-game-settings") ? document.getElementById("header-game-settings").textContent = 'Game settings' : console.log("Translation element not found.");
                document.getElementById("settings-submit-button") ? document.getElementById("settings-submit-button").value = 'Confirm' : console.log("Translation element not found.");
                document.getElementById("settings-close-button") ? document.getElementById("settings-close-button").value = 'Abort' : console.log("Translation element not found.");

                break;
            default:
                console.log("Error: Unexpected language given!");
                break;
        }   
    }

}

if(typeof module != 'undefined') {
    module.exports = Translator;
}
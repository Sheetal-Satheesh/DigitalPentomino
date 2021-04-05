class Translator{

    static translateHeaders(language){
        //simple replacement of headers to language
        let lang = language === "en" ? 0 : 1;

        switch (language) {
            case "de": case "en":
                document.getElementById("header-game-settings") ? document.getElementById("header-game-settings").textContent = strings.settings.header[lang] : console.log("Translation element nicht gefunden.");
                document.getElementById("settings-submit-button") ? document.getElementById("settings-submit-button").value = strings.settings.buttons.apply[lang] : console.log("Translation element nicht gefunden.");
                document.getElementById("settings-close-button") ? document.getElementById("settings-close-button").value = strings.settings.buttons.cancel[lang] : console.log("Translation element nicht gefunden.");
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
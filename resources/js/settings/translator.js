class Translator{

    static translateHeaders(language){
        //simple replacement of headers to language
        //document.getElementById("header-game-settings") ? document.getElementById("header-game-settings").textContent = strings.settings.header[language] : console.log("Translation element not found.");
        document.getElementById("settings-submit-button") ? document.getElementById("settings-submit-button").value = strings.settings.buttons.apply[language] : console.log("Translation element not found.");
        document.getElementById("settings-close-button") ? document.getElementById("settings-close-button").value = strings.settings.buttons.cancel[language] : console.log("Translation element not found.");
    }

}

if(typeof module != 'undefined') {
    module.exports = Translator;
}

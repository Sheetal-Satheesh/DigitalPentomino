class Translator{

    static translateHeaders(language){
        //simple replacement of headers to language
        switch (language) {
            case "de":
                document.getElementById("header-game-settings").textContent = 'Spieleinstellungen';
                break;
            case "en":
                document.getElementById("header-game-settings").textContent = 'Game settings';
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
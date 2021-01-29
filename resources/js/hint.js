class Hint {
    constructor(text, command) {
        this.text = text;
        this.command = command;
    }

    getText() {
        return this.text;
    }

    getCommand() {
        return this.command;
    }
}

if(typeof module != 'undefined') {
    module.exports = Hint;
}

class Hint {
    constructor(commands, possibleSolutions, skill=null) {
        this._commands = commands;
        this._possibleSolutions = possibleSolutions;
        this._skill = skill;
    }

    getSkill() {
        return this._skill;
    }

    getCommands() {
        return this._commands;
    }

    getPossibleSolutions() {
        return this._possibleSolutions;
    }
}

if(typeof module != 'undefined') {
    module.exports = Hint;
}

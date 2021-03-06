class Hint {
    constructor(command, possibleSolutions, skill=null) {
        this._command = command;
        this._possibleSolutions = possibleSolutions;
        this._skill = skill;

        // console.log("Number of possible solutions: " + possibleSolutions.length);

        this._text = "";

        if (possibleSolutions.length === 0) {
            this._text += "This doesn't look right. The pentominoes on your board aren't part of a solution."
        }

        switch (command.Name()) {
            case "Remove":
                this._text += "This doesn't look right. Why don't you remove " + command._pentomino.name;
                break;
            case "MoveToPosition":
                this._text += "Maybe try to move " + command._pentomino.name + " to position [" + command._row + "," + command._col + "]";
                break;
            case "Place":
                this._text += "Why don't you place " + command._pentomino.name + " at position [" + command._row + "," + command._col + "]";
                break;
            case "RotateClkWise":
                this._text += "Why don't you try to rotate " + command._pentomino.name + " clock-wise";
                break;
            case "RotateAntiClkWise":
                this._text += "Why don't you try to rotate " + command._pentomino.name + " anti-clock-wise";
                break;
            case "MirrorH":
                this._text += "Why don't you try to mirror " + command._pentomino.name + " horizontal";
                break;
            case "MirrorV":
                this._text += "Why don't you try to mirror " + command._pentomino.name + " vertical";
                break;
            default:
                this._text += "Error - unknown command with name '" + command.Name() + "'";
                throw new Error("Error: unknown command with name " + command.Name());
        }

    }

    getText() {
        return this._text;
    }

    getCommand() {
        return this._command;
    }

    getPossibleSolutions() {
        return this._possibleSolutions;
    }
}

if(typeof module != 'undefined') {
    module.exports = Hint;
}

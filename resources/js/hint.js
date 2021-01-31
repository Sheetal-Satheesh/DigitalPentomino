class Hint {
    constructor(command) {
        this.command = command;

        switch (command.getName()) {
            case "remove":
                this.text = "This doesn't look right. Why don't you remove " + command._pentomino.name;
                break;
            case "moveToPosition":
                this.text = "Maybe try to move " + command._pentomino.name + " to position [" + command._row + "," + command._col + "]";
                break;
            case "place":
                this.text = "Why don't you place " + command._pentomino.name + " at position [" + command._row + "," + command._col + "]";
                break;
            case "rotateClkWise":
                this.text = "Why don't you try to rotate " + command._pentomino.name + " clock-wise";
                break;
            case "rotateAntiClkWise":
                this.text = "Why don't you try to rotate " + command._pentomino.name + " anti-clock-wise";
                break;
            case "mirrorH":
                this.text = "Why don't you try to mirror " + command._pentomino.name + " horizontal";
                break;
            case "mirrorV":
                this.text = "Why don't you try to mirror " + command._pentomino.name + " vertical";
                break;
            default:
                this.text = "Error - no text found for command with name '" + command.getName() + "'";
                break;
        }
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

class CommandSequenceList {
    constructor() {
        this._commandSequences = [];
    }

    addCommandSequence(pentomino, commands) {
        this._commandSequences.push({
           pentomino: pentomino,
           commands: commands
        });
    }

    getAllCommandSequences() {
        return this._commandSequences;
    }
}

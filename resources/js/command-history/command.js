let idCounter = 0;

class Command {
    constructor(id=-1) {
        this._parent = null;
        this._children = [];
        if (!(id === -1)) {
            idCounter = id > idCounter ? id : idCounter;
        } else {
            this._id = idCounter++;
        }
    }

    execute() {}
    undo() {}

    getChildren() {
        return this._children;
    }

    getParent() {
        return this._parent;
    }

    setParent(parent) {
        this._parent = parent;
    }

    getId() {
        return this._id;
    }
}

if(typeof module != 'undefined') {
    module.exports = Command;
}

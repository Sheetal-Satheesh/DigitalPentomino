function GameLoader() {

}

GameLoader.prototype.loadByName = function (name) {
    let board;

    switch (name) {
        case "Level 1":
            // TODO - add pieces to board
            board = new Board([5, 5]);
            document.write("Starting level 1");
            break;
        case "Level 2":
            // TODO
            break;
        case "Level 3":
            // TODO
            break;
        default:
            throw new Error("No game found with the name '" + name + "'");
    }

    return board;
}

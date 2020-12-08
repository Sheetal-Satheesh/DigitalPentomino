class Board {
    /**
     * @desc:
     *      It will create a default board
     *
     * @param:
     *       size: {X,Y}
     * @param:
     *       color: default color;
     *       shape: square, rectangle, christmas tree
     */
    constructor(size, color, shape) {
        this.size = size;
        this.color = color;
        this.shape = shape;
    }

    display() {
        document.write("Board: X X X X X");
    }
}

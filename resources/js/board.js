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
    constructor(size) {
        this.size = size;

        this.array = [];
        for (let i = 0; i < this.size[0]; i++) {
            let col = [];
            for (let j = 0; j < this.size[1]; j++) {
                col.push('X');
            }

            this.array.push(col);
        }
    }

    display() {
        document.write("Board:<br>");
        for (let i = 0; i < this.size[0]; i++) {
            document.write("|");
            for (let j = 0; j < this.size[1]; j++) {
                document.write(this.array[i][j]);
            }
            document.write("|<br>");
        }
    }
}

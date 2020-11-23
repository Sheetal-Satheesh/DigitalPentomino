class Pentominos {

    constructor(size,color, shape, orientation, coordinates){
        this.size = size;
        this.color=color;
        this.shape=shape;
        this.orientation = orientation;
        this.coordinates = coordinates;
    }
    
    create();
    setOrientation();
    
    rotateRight();
    rotateLeft();
    flipHorizontal();
    flipVertical();

    rotate180();

    reset();
    delete();
    
    setColor();
    setSize();
    setShape();
    
    isResizable();
}
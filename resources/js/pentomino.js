/**
 * @desc:  It will create a pentomino (piece) based on the parameters.
 * @param:
 *         size: {width,height},
 *         color: #FFFFFF (or "black"),
 *         shape: F, I, L, ...,
 *         orientation: tbd,
 *         coordinates: {x,y}
 * 
 * @return:
 *          pentomino
 */

function Pentomino(size,color,shape,orientation,coordinates){

    this.size = size;
    this.color = color;
    this.shape = shape;
    this.orientation = orientation;
    this.coordinates = coordinates;
}

/**
 * @desc:   Will display the piece for testing.
 * @param:
 *          none
 * 
 * @return:
 *          pentomino
 */

Pentomino.prototype.display = function() {
    document.write("I am a " + this.shape + " piece.");
}

Pentomino.prototype.setOrientation = function(){
    
}

Pentomino.prototype.rotateRight = function(){
    
}

Pentomino.prototype.rotateLeft = function(){
    
}

Pentomino.prototype.flipHorizontal = function(){
    
}

Pentomino.prototype.flipVertical = function(){
    
}

Pentomino.prototype.rotate180 = function(){
    
}

Pentomino.prototype.reset = function(){
    
}

Pentomino.prototype.delete = function(){
    
}

Pentomino.prototype.setColor = function(){
    
}

Pentomino.prototype.setSize = function(){
    
}

Pentomino.prototype.setShape = function(){

}

Pentomino.prototype.isResizable = function(){

}

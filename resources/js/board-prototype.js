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
    constructor(size,color, shape){
        this.size = size;
        this.color=color;
        this.shape=shape;
    }
    /**
     * @desc:  It will create a board based on the param object.
     * @param:
     *         boardJsonConfig, 
     * @return:
     *          board
     */
    create();

    delete();

    /**
     * @desc: clear the existing board
     * @param:
     *      NA
     * @return:
     *      success of Failed
     */
    reset();
    /**
     * reSize();setColor();setShape();
     * @desc: Not sure its application, may be required later. Depends on front end team member
     */
    reSize();
    setColor();
    setShape();

     /**
     * @desc: Set tiles in a board
     * @param:
     *      PentominoObject
     * @return:
     *      success or Failed;  || (Occupied cells)   
     */

    placePentominos(pentominos);

    /**
     * @desc: Remove or Pick up a pentomino from the board
     * @param:
     *      PentomninoObj;
     * @return:
     *      Unoccupied cells
     */
    removePentominos(pentominos);

    /**
     * @desc: move already placed a pentomnion to a another place
     * @param:
     *      pentomino
     * @returns:
     *      occupied cells
     */
    movePentominos();

    /**
     * @desc: 
     * @param: NA
     * @return:
     *      True or False
     */
    isBoardComplete();

    /**
     * @desc: Get already placed pentominos in a board
     * @param:NA
     * @returns:
     *      pentomnios 
     *      
     * 
     */
    getPentominos();

    /**
     * @desc: Get unoccupied cells
     * @param:
     *      NA
     * @returns:
     *      unoccupied cells
     */
    getEmptyCells();
    /**
     * @desc: Get Filled cells
     * @param:
     *      NA
     * @returns:
     *      occupied cells
     */
    getFilledCells();

    /**
     * @desc: check for any collision or overlap with existing pentonminos in the board, it can be called from 
     *        placePentominos(pentominos);
     * @param:
     *      pentominos
     * @return:
     *      True or False
     */

    isCollides(pentominos);
    /**
     * @desc: Not sure about the purpose, but we need some function to validate the pentomino placing letf
     * any hole in between, that will not be covered by any other pentominos. Like If we place X, in top left
     * corner.
     * @param :
     *      pentominos
     * @return:
     *      true or false 
     */
    validatePentomnos(pentominos);

    /**
     * @desc: print the board with placed pieces, main purpose for debugging. Front end team will  take care of 
     * real display.
     * @param: NA
     * @return:
     *      NA
     */

    display();
   
}

/**
 * Desc: This is demo function for board create
 * param:
 *      size:
 *      color:
 *      shape:
 * return:
 *      borad
 */
Board.prototype.create = function(size,color, shape) {
    
    return this;
  }

  Board.prototype.setTiles = function() {
    

  }
  
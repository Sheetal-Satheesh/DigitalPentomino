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
function Board(size,color, shape) {
    this.size = size;
    this.color = color;
    this.shape = shape;
}

/**
 * @desc:  It will create a board based on the param object.
 * @param:
 *         boardJsonConfig,
 * @return:
 *          board
 */
Board.prototype.create = function() {};


/**
 * @desc: clear the existing board
 * @param:
 *      NA
 * @return:
 *      success of Failed
 */
Board.prototype.reset  = function() {};
/**
 * reSize();setColor();setShape();
 * @desc: Not sure its application, may be required later. Depends on front end team member
 */
Board.prototype.resize = function() {};
Board.prototype.setColor = function() {};
Board.prototype.setShape = function() {};

 /**
 * @desc: Set tiles in a board
 * @param:
 *      PentominoObject
 * @return:
 *      success or Failed;  || (Occupied cells)
 */

Board.prototype.placePentominos = function(pentominos) {};

/**
 * @desc: Remove or Pick up a pentomino from the board
 * @param:
 *      PentomninoObj;
 * @return:
 *      Unoccupied cells
 */
Board.prototype.removePentominos = function(pentominos) {};

/**
 * @desc: move already placed a pentomnion to a another place
 * @param:
 *      pentomino
 * @returns:
 *      occupied cells
 */
Board.prototype.movePentominos = function() {};

/**
 * @desc:
 * @param: NA
 * @return:
 *      True or False
 */
Board.prototype.isBoardComplete = function() {};

/**
 * @desc: Get already placed pentominos in a board
 * @param:NA
 * @returns:
 *      pentomnios
 *
 *
 */
Board.prototype.getPentominos = function() {};

/**
 * @desc: Get unoccupied cells
 * @param:
 *      NA
 * @returns:
 *      unoccupied cells
 */
Board.prototype.getEmptyCells = function() {};
/**
 * @desc: Get Filled cells
 * @param:
 *      NA
 * @returns:
 *      occupied cells
 */
Board.prototype.getFilledCells = function() {};

/**
 * @desc: check for any collision or overlap with existing pentonminos in the board, it can be called from
 *        placePentominos(pentominos);
 * @param:
 *      pentominos
 * @return:
 *      True or False
 */

Board.prototype.isCollides = function(pentominos) {};
/**
 * @desc: Not sure about the purpose, but we need some function to validate the pentomino placing letf
 * any hole in between, that will not be covered by any other pentominos. Like If we place X, in top left
 * corner.
 * @param :
 *      pentominos
 * @return:
 *      true or false
 */
Board.prototype.validatePentomnos = function(pentominos) {};

/**
 * @desc: print the board with placed pieces, main purpose for debugging. Front end team will  take care of
 * real display.
 * @param: NA
 * @return:
 *      NA
 */

Board.prototype.display = function() {};

Board.prototype.setTiles = function() {};

const UIProperty = {
    "TrayCSSLeft":7, // [Hot-Fix : Bug-#63 ] Pieces disappear after rotation and placement onto the tray
    "TrayHeight":12.5, // [Hot-Fix : Bug-#63 ] Pieces disappear after rotation and placement onto the tray
    "WindowWidth":90,
    "PentominoX": 5,
    "PentominoY": 5,
    "FunctionWidth": 10
}
Object.freeze(UIProperty)

class Visual {

    constructor(pd) {
        this.pd = pd;
        this.gameController = pd.gameController;
        this.boardX = pd.boardStartX;
        this.boardY = pd.boardStartY;
        this.pieces = this.gameController.getPentominoes();
        this.selected = false

        this.renderBoard();
        this.renderPieces();

        this.initalizeListeners();
    }


    isBlockCell(posX, posY){
        var bCellsFnd=false;
            if (this.pd.blockedCells != undefined){
                this.pd.blockedCells.forEach(function(cells){
                    if(cells[0] + this.boardX == posX && cells[1] + this.boardY == posY){
                        bCellsFnd= true;
                    }
                },this);
            }

            return bCellsFnd ;
    }

    isPentominoInBlockCells(pentomino){
            var [pX, pY] = this.gameController.getPositionOfPentomino(pentomino);
            var pMatrix = pentomino.getMatrixRepresentation();

            for(let i=0; i <pentomino.iRows; ++i){
                for(let j=0; j < pentomino.iCols; ++j){
                    if(pMatrix[i][j]===1){
                        let px = (pX - 2)+i;
                        let py = (pY - 2)+j;
                        if(this.isBlockCell(px,py)){
                            return true;
                        }
                    }
                }
            }

        return false;
    }

    isCollision(pentomino){
        let collisionPentominoes = this.gameController.getCollisionPentominoesOfPentomino(pentomino);
        if (collisionPentominoes.length != 0){
            return true;
        }else{
            return false;
        }
    }

    placePentomino(pentomino, posX, posY){

        this.gameController.placePentomino(pentomino, posX, posY);
        var bCellsFnd = this.isPentominoInBlockCells(pentomino);
        var collisonFnd = this.isCollision(pentomino);
        var offset = (bCellsFnd || collisonFnd)?true:false;

        this.positionPiece(pentomino, offset);
    }

    movePentominoToTray(pentomino){
        this.gameController.removePentomino(pentomino);
    }

    clear(){
        this.gameController.resetGame();
        this.pieces = this.gameController.getPentominoes();
        this.pd.visual.disableManipulations();
        this.renderPieces();
    }

    callHintAI() {
                let hint = document.getElementById("myHint");
                hint.classList.toggle("show");
                let popupText = document.getElementById("myHint");
                let penHint = this.gameController.getHint();
                let hintinPen = penHint.getCommand()._pentomino;
                popupText.textContent = this.penHint.getText();
            }


    renderBoard() {
        //TODO: Check whether in the innerHTML approach is good here!

        var fieldHTML = document.getElementById('field');
        var out = '';
        var width = UIProperty.WindowWidth / this.pd.gameWidth;

        /*The field consists of divs. Each div saves in its id field its resepective coorinates*/

        for (var row = 0; row < this.pd.gameHeight; row++) {
            for (var col = 0; col < this.pd.gameWidth; col++) {

                var isBoard = true;   //indicate where on the field the board is
				var blockedCell = false;
                //TODO: Implement blocked elements
                if (col < this.boardY) isBoard = false;
                if (col >= this.boardY + this.gameController.getBoardSize()[1]) isBoard = false;
                if (row < this.boardX) isBoard = false;
                if (row >= this.boardX + this.gameController.getBoardSize()[0]) isBoard = false;
              //Ashwini: For Blocking the cells
				if (this.pd.blockedCells != undefined)
				{
					for (var arr = 0; arr < this.pd.blockedCells.length; arr++) {
						if(row == this.pd.blockedCells[arr][0] + this.pd.boardStartX && 
                                col == this.pd.blockedCells[arr][1] + this.pd.boardStartY) {
							blockedCell = true;
							break;
						}
					}
                   
                    if(blockedCell)
						out += '<div class="gamearea ' + ((isBoard) ? 'boardarea blockedcell' : '') + '" id="field_' + row + ',' + col + '" title="' + row + ',' + col + '" style="width:' + width + 'vw;height:' + width + 'vw;"></div>';
					else
						out += '<div class="gamearea ' + ((isBoard) ? 'boardarea' : '') + '" id="field_' + row + ',' + col + '" title="' + row + ',' + col + '" style="width:' + width + 'vw;height:' + width + 'vw;"></div>';
				}
				else
					out += '<div class="gamearea ' + ((isBoard) ? 'boardarea' : '') + '" id="field_' + row + ',' + col + '" title="' + row + ',' + col + '" style="width:' + width + 'vw;height:' + width + 'vw;"></div>';   //'+col+','+row+'
            }
        }

        fieldHTML.innerHTML = out;
    }

    /**
     * Create the visual representations of the pieces
     * */

    renderPieces() {

        //TODO: Check whether in the innerHTML approach is good here!

        /**
         * Thoughts: It is okay if renderPieces is only called at the start of a game and pice
         * updates are handeled differently.
         *
         * If this function should also handle updates, it should rather check whether elements
         * already exist and update their respective properties instead of creating the pieces
         * again and again.
        */

        var pieceArea = document.getElementById('piecearea');
        let out = '';
        var width = UIProperty.WindowWidth / this.pd.gameWidth;
        this.pieces.forEach(piece => {
            let bitMap = piece.getMatrixRepresentation();

            /**
             * this are the bouding boxes into which the piece itself is "painted" setting
             * to display:none avoids the appearing for a split second before positioning
             *
            */

           out += '<div class="piece" id="piece_' + piece.name + '" style="width:' + (5 * width) + 'vw;height:' + (5 * width) + 'vw;display:none">';

            //this "paints" the bitmap of the pice into the bounding box
            for (var i in bitMap) {
                var row = bitMap[i];
                for (var j in row) {
                    var set = bitMap[i][j];
                    out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:' + piece.color : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                }
            }
            out += '</div>';

            //positioning the pieces has to happen after the elements are created
            //TODO: this is a disadvantage of chosing the innerHTML approach.

            setTimeout(function (that, piece) {
                that.positionPiece(piece);
            }, 0, this, piece);

        });

        pieceArea.innerHTML = out;

    }

   positionPiece(piece, offset=false) {
        var width = UIProperty.WindowWidth / this.pd.gameWidth;
        var htmlElement = document.getElementById('piece_' + piece.name);

        if (piece.inTray) {
            var trayPosition = piece.trayPosition;
            /**
             * 7 is trayHeight
             */
            var widthVW = UIProperty.TrayCSSLeft + (piece.trayPosition) * 7; //HOT-FIX: 7 is tray height
            var magnification = 6 / (5 * width);
            htmlElement.style.left = widthVW + 'vw';

            let trayWidth = document.getElementById("tray");
            htmlElement.style.top = '0';
            htmlElement.style.marginTop = "-5.5%";// [Hot-Fix : Bug-#63 ] Pieces disappear after rotation and placement onto the tray
            htmlElement.style.setProperty("--magnification", magnification);
            htmlElement.style.transformOrigin = 'center'; // [Hot-Fix : Bug-#63 ] Pieces disappear after rotation and placement onto the tray
            //htmlElement.style.transformOrigin='0 5%';
            htmlElement.style.zIndex = 3000;

        } else  {

            let [positionY, positionX] = this.gameController.getPositionOfPentomino(piece);
            let left = undefined;
            let top = undefined;
            if(offset){
                left = UIProperty.FunctionWidth + width * (positionX - 2)+ (width/8);
                top = UIProperty.TrayHeight + width * (positionY - 2)-(width/8);

                if(htmlElement.style.zIndex >= 2000 ){
                    htmlElement.style.zIndex =1500;
                }else {
                    htmlElement.style.zIndex =htmlElement.style.zIndex + 20; ;
                }

            }else{
                left = UIProperty.FunctionWidth + width * (positionX - 2);
                top = UIProperty.TrayHeight + width * (positionY - 2);


                if(htmlElement.style.zIndex >= 2000 ){
                    htmlElement.style.zIndex = 1000;
                }else if (htmlElement.style.zIndex > 0){
                    htmlElement.style.zIndex = htmlElement.style.zIndex+10;
                }else{
                    htmlElement.style.zIndex -= 50;
                }
            }

            htmlElement.style.left = left + 'vw';
            htmlElement.style.top = top + 'vw';
            htmlElement.style.setProperty("--magnification", 1);
            htmlElement.style.transformOrigin = '50% 50%';

        }
        if (htmlElement.style.getPropertyValue("--rotationX") === "") {
            htmlElement.style.setProperty("--rotationX", "0deg");
            htmlElement.style.setProperty("--rotationY", "0deg");
            htmlElement.style.setProperty("--rotationZ", "0deg");
        }

        //making the element visible (see remark in renderPieces)
        htmlElement.style.display = 'block';

    }

    select(piece,xPosition,yPosition) {
        this.selected = piece;
        this.showManipulations(xPosition,yPosition);

    }

    deleteSelection() {
        if (!this.selected) return;
        this.selected = false;
        this.pd.visual.disableManipulations();
    }

    //Enable or Disable manipulation buttons

    showManipulations(xPosition,yPosition) {

        document.getElementById("btnRotateRight").disabled = false;
        document.getElementById("btnRotateLeft").disabled = false;
        document.getElementById("btnFlipH").disabled = false;
        document.getElementById("btnFlipV").disabled = false
        document.getElementById('pieceManipulation').style.display = 'block';
        document.getElementById('pieceManipulation').style.left = xPosition + 'px';
        document.getElementById('pieceManipulation').style.top = yPosition + 'px';
    }

    disableManipulations() {

        document.getElementById("btnRotateRight").disabled =true;
        document.getElementById("btnRotateLeft").disabled =true;
        document.getElementById("btnFlipH").disabled =true;
        document.getElementById("btnFlipV").disabled =true;
        document.getElementById('pieceManipulation').style.display = 'none';

    }
    // 	save(piece) {
    // 		console.log("insave::",piece)
    // 	  	localStorage.setItem('piece',piece);
    // 	}

    // load() {
    //   let piece2 = localStorage.getItem('piece');
    //   document.getElementById('operations').style.display='block';
    //   console.log("getting state::",piece2)
    // }


    //initialize input listeners.
    initalizeListeners() {

        var that = this;
        let onpointerdownX = "";
        let onpointerdownY = "";

        /**
         * pointer events generalize mouse and touch events the events are registered on
         * the document object in order to avoid problems of losing objects when moving
         * too fast (which can happen in mouse interaction). Ad differnt things have to
         * happen in relation to different kinds of objects and in different states of
         * the application this basically becomes a big state automaton.
         *
         */

        document.onpointerdown = function (event) {//clicking or moving begins
        var elements = document.elementsFromPoint(event.clientX, event.clientY);
        onpointerdownX = event.clientX;
        onpointerdownY = event.clientY;

        for (var i in elements) {
            var check = elements[i].className;
            if (check !== 'bmPoint') continue;

            /**
             * As soon as we have a bmPoint(an element of a piece),we determine the bounding box
             * and the piece object itself and save those into a global variable "currentlyMoving"
             * which we access during movement and at the end of movement.
             */
                var piece = elements[i * 1 + 1].id.split('_')[1];
                if (!piece) return;
                var container = elements[i * 1 + 1];       //For some strange reason, i is a String, using *1 to convert it
                var piece = that.pieces.find(p => { return p.name === piece; });
                window.currentlyMoving = [container, piece];
            }

            return;

        }

        /**
         * move an object in case a drag operation stared on a piece (see above)
         */

        document.onpointermove = function (event) {

            if (window.currentlyMoving) {
                var x = event.clientX;
                var y = event.clientY;
                var container = window.currentlyMoving[0];

                //resize object to full size while moving and attach their center to the pointer
                var width = UIProperty.WindowWidth / that.pd.gameWidth;
                //set new style for left and top value of element, BUT do not cross borders
                var functionsWidth = document.getElementById("functions").clientWidth;
                var gameWidth = document.getElementById("game").clientWidth;
                var gameHeight = document.getElementById("game").clientHeight;

                if ((x > functionsWidth) && (x < (gameWidth + functionsWidth))) {
                    if ((y > 0) && (y < gameHeight)) {
                        container.style.left = 'calc(' + x + 'px - ' + (width * 2.5) + 'vw)';
                        container.style.top = 'calc(' + y + 'px - ' + (width * 1) + 'vw)';
                        container.style.setProperty("--magnification", 1);// [Hot-Fix : Bug-#63 ] Pieces disappear after rotation and placement onto the tray
                        container.style.transformOrigin = '50% 50%';
                        container.style.zIndex += 1000;

                    }
                }
            }
        }

        /**
         * this is called when mouse key is released or fingers are removed from the screen
         */
        document.onpointerup = function (event) {
        /**
         * this is called when mouse key is released or fingers are removed from the screen
         * in case of just a click operation (not move operation) piece should not move
         */
            if( onpointerdownX == event.clientX &&
                onpointerdownY == event.clientY &&
                window.currentlyMoving) {
                    let data_ = window.currentlyMoving;
                    window.currentlyMoving = false;
                    that.positionPiece(data_[1]);
                    that.select(data_[1],event.clientX,event.clientY);
                    return;
            }

            if (window.currentlyMoving) {

                /*  In case an object was in the process of being moved, this changes the movement.
                    which means it is determined, where it was moved to and then the backend is informed
                    about that movement (which in turn  repositions the element so it snaps to the grid)
                */
                var data = window.currentlyMoving;
                window.currentlyMoving = false;
                var elements = document.elementsFromPoint(event.clientX, event.clientY); //determine the target

                for (var i in elements) {
                    var element = elements[i];
                    var id = element.id;
                    //Ashwini: when piece is moved back to tray reset Pentomio inTray variable to 1 and place the piece in Tray
                    if (id == 'tray') {
                        let piece = data[1].toTray();
                        that.positionPiece(piece);
                        that.movePentominoToTray(piece);
                    }

                    if (id.split('_')[0] == 'field') {
                        var coords = (id.split('_')[1].split(','));
                        data[1].removeFromTray();
                        that.placePentomino(data[1], coords[0],coords[1] );
                        that.showNumberOfPossibleSolutions();
                        /**
                         * make this the selected element which activates manipulation GUI data[1].select();
                         *
                         * TODO: Make buttons disappear/appear if nothing/something is selected
                         */
                        that.select(data[1],event.clientX,event.clientY);
                        return;
                    }
                }
            } else {
                // In case nothing was moving, this becomes an unselect operation
                var elements = document.elementsFromPoint(event.clientX, event.clientY);
                for (var i in elements) {
                    var element = elements[i];
                    if (element.id == 'functions' || element.id == 'pieceManipulation') return; //do not unselect if operations have been applied to the functions panel
                }

                that.deleteSelection();
            }
        }

    }

    rotateClkWise() {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationZ").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = flipped ? currentRot - 90 : currentRot + 90;
            // Update the backend
            this.gameController.rotatePentominoClkWise(piece);
            var bCellsFnd = this.isPentominoInBlockCells(piece);
            var collisonFnd = this.isCollision(piece);
            var offset = (bCellsFnd || collisonFnd)?true:false;
            this.positionPiece(piece, offset);
            pieceDiv.style.setProperty("--rotationZ", newRot.toString() + "deg");
        }
    }

    rotateAntiClkWise() {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationZ").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = flipped ? currentRot + 90 : currentRot - 90;
            // Update the backend
            this.gameController.rotatePentominoAntiClkWise(piece);
            var bCellsFnd = this.isPentominoInBlockCells(piece);
            var collisonFnd = this.isCollision(piece);
            var offset = (bCellsFnd || collisonFnd)?true:false;
            this.positionPiece(piece, offset);
            pieceDiv.style.setProperty("--rotationZ", newRot.toString() + "deg");
        }
    }

    flipH() {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationX").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = currentRot + 180;
            // Update the backend
            this.gameController.mirrorPentominoH(piece);
            var bCellsFnd = this.isPentominoInBlockCells(piece);
            var collisonFnd = this.isCollision(piece);
            var offset = (bCellsFnd || collisonFnd)?true:false;
            this.positionPiece(piece, offset);
            pieceDiv.style.setProperty("--rotationX", newRot.toString() + "deg");
            pieceDiv.setAttribute("flipped", 1 - flipped);
        }
    }

    flipV() {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationY").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = currentRot + 180;
            // Update the backend
            let [penX,penY] = this.gameController.getPositionOfPentomino(piece);
            this.gameController.mirrorPentominoV(piece);
            var bCellsFnd = this.isPentominoInBlockCells(piece);
            var collisonFnd = this.isCollision(piece);
            var offset = (bCellsFnd || collisonFnd)?true:false;
            this.positionPiece(piece, offset);
            pieceDiv.style.setProperty("--rotationY", newRot.toString() + "deg");
            pieceDiv.setAttribute("flipped", 1 - flipped);
        }
    }

    showNumberOfPossibleSolutions() {
        let labelPossibleSolutions = document.getElementById("labelNumberSolutions");
        labelPossibleSolutions.innerText = this.gameController.getHint().getPossibleSolutions().length;
    }

    callHintAI(){
        let hint = document.getElementById("myHint");
        hint.classList.toggle("show");
        hint.style.visibility = "visible";
        let popupText = document.getElementById("myHint");
        popupText.textContent = pd.gameController.getHint().getText();

        //call indication of hint
        this.indicateHint(500);

            
    }

    indicateHint(timeoutFrame){
        //possible command names (place, remove, moveToPosition, rotateClkWise, rotateAntiClkWise, mirrorH, mirrorV)
        let hintCommand = pd.gameController.getHint().getCommand();
        let hintSkill = pd.gameController.getHint()._skill;
        let hintName = hintCommand.getName();
        let hintinPen = hintCommand._pentomino;
        let pentominoColor = hintinPen.color;
        let clientRect = document.getElementById("piece_" + hintinPen.name).getBoundingClientRect();
       let [posX, posY] = [clientRect.x + clientRect.width/2, clientRect.y + clientRect.height/2];

       //indication of unoccupied cells
        if (!(hintSkill === null)) {
            for(let i=0;i<hintSkill.length;i++){
                let fieldvalue = document.getElementById("field_" + hintSkill[i][0] + "," + hintSkill[i][1]); 
                var defaultBackground = fieldvalue.style.background = "#adc0b9";
                fieldvalue.style.background = "#f08080";
                //fieldvalue.style.boxShadow ="0 15px 25px -4px rgba(0,0,0,0.4), inset 0 -8px 25px -1px rgba(255,255,255,0.9), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 8px 20px 0 rgba(0,0,0,0.2), inset 0 0 5px 1px rgba(255,255,255,0.6)";
                setTimeout(function(){ fieldvalue.style.background = defaultBackground; }, 2000);
            }
        }

        else{
              switch (hintName) {
            case "place":
                // handle place hint
                let hintRow = hintCommand._row;
                let hintColumn = hintCommand._col;
                let fieldvalue;
                let prevBackground = [];

                //indicate piece to be moved (and fade away)
                Array.prototype.forEach.call(document.getElementById("piece_" + hintinPen.name).getElementsByClassName("bmPoint"), function(element) {
                    element.style["box-shadow"] = "0 0 20px " + pentominoColor;
                    setTimeout(function(){
                        element.style.removeProperty("box-shadow");
                    }, timeoutFrame*4);
                });

                //show destination position (and fade away)
                let piecePos = this.getOccupiedPositions(hintinPen,hintCommand);
                console.log("hintinPen",hintinPen, piecePos);
                    for(let i=0;i<5;i++){
                            fieldvalue = document.getElementById("field_" + piecePos[i][0] + "," + piecePos[i][1]);
                            prevBackground[i] = fieldvalue.style.background;
                            fieldvalue.style.background = pentominoColor;
                            this.hide(piecePos, prevBackground);
                    }
                break;
            
            case "remove":
                // handle remove hint
                this.select(hintinPen,posX,posY);
                var pen = document.getElementById("piece_" + hintinPen.name);
                console.log("pent",hintinPen,this.selected);
                if (!this.selected.inTray){
                    pen.style.display = 'none';
                    setTimeout(function(){
                    pen.style.display = 'block';
                    },2000);
                }
                break;
                    
            case "rotateClkWise":
                // handle rotateClkWise hint
                this.select(hintinPen,posX,posY);
                if (!this.selected.inTray){
                    console.log("Remove piece from tray for visual hint.");
                    rotateClkWise();
                    setTimeout(function(){
                    rotateAntiClkWise();
                    },timeoutFrame);
                }
                break;

            case "rotateAntiClkWise":
                // handle rotateAntiClkWise hint
                this.select(hintinPen,posX,posY);
                if (!this.selected.inTray){
                    rotateAntiClkWise();
                    setTimeout(function(){
                    rotateClkWise();
                    },timeoutFrame);
                }
                break;
            
            case "mirrorH":
                // handle mirrorH hint
                //select piece in the UI to flip
                this.select(hintinPen,posX,posY);
                if (!this.selected.inTray){
                    flipH();
                    setTimeout(function(){
                    flipH();
                    },timeoutFrame);
                }
                break;

            case "mirrorV":
                // handle mirrorV hint
                this.select(hintinPen,posX,posY);
                if (!this.selected.inTray){
                    flipV();
                    setTimeout(function(){
                    flipV();
                    },timeoutFrame);
                }
                break;

            default:
                console.log("Unknown piece action detected!");
        }
        
    }
}


      

    hide(piecePos, prevBackground){

        setTimeout(function(){
            for (let j=0;j<5;j++){
                    let fvalue = document.getElementById("field_" + piecePos[j][0] + "," + piecePos[j][1]);
                    //TODO: replace with proper fadeOut animation
                    fvalue.style.background = prevBackground[j];
                
            }
        }, 2000);
    }


    getOccupiedPositions(piece,hintCommand){

        let PiecePostions = [];
        let hintRow = hintCommand._row;
        let startRow = hintRow-2;
        let hintColumn = hintCommand._col;
        let startColumn = hintColumn-2;
        let occupiedPosArray=[];
        
        let pieceBitmap = piece.getMatrixRepresentation();

        //add all elements of current 5*5 overlay on board where piece matrix has 1's
        let k=0;
        for (let i = 0; i<5; i++){
            for (let j = 0; j<5; j++){
                let piecePos = [];
                if (pieceBitmap[i][j] == "1"){
                    //add to occupiedPosArray
                    piecePos[0] = i+startRow;
                    piecePos[1] = j+startColumn;
                    occupiedPosArray[k] = piecePos;
                    k++;
                }
            }
        }

        return occupiedPosArray;
    }

    prefillBoard() {
        this.clear();
        let allSolutions = [];
        // Get all the games and filter solutions
        if(this.allSolutions == undefined) {
            GameLoader.getGamesFromSolutionsConfig(this.pd.boardName).forEach(game => 
                allSolutions.push([game._board._pentominoPositions, game._board._pentominoes]));
            this.allSolutions = allSolutions;
        }
        let prefillCandidates = [];
        let randomSolution = undefined;
        let positions = [];
        let currentAnchor = [];
        let candidateAnchor = [];
        let piece = undefined;
        let piecePosition = undefined;
        let bOverlap = false;
        if (this.allSolutions.length > 0) {
            randomSolution = this._getRandomElementFromArray(this.allSolutions);
        } else {
            ;// TODO: throw error
        }
        if (randomSolution != undefined) {
            for(let i = 0; i < randomSolution[0].length; ++i) {
                piecePosition = randomSolution[0][i];
                piece = randomSolution[1][i];
                currentAnchor = [piecePosition.boardPosition[0] + this.boardX,
                                piecePosition.boardPosition[1] + this.boardY];
                for (let j = 0; j < positions.length; ++j) {
                    bOverlap = false;
                    candidateAnchor = [positions[j][0], positions[j][1]];
                    if(Math.sqrt(
                        Math.pow((currentAnchor[0]-candidateAnchor[0]),2) +
                        Math.pow((currentAnchor[1]-candidateAnchor[1]),2)) < 2.2) {
                            bOverlap = true;
                            break;
                    }
                }
                if(bOverlap) {
                    piece = new Pentomino(piece.name);
                    prefillCandidates.push(piece);
                    continue;   
                }
                prefillCandidates.push(piece);
                positions.push(currentAnchor);
                piece.removeFromTray();
                this.gameController.placePentomino(piece, currentAnchor[0], currentAnchor[1]);
            }
        } else {
            ;// TODO: throw error
        }
        this.pieces = prefillCandidates;
        this.renderPieces();
    }

    _getRandomElementFromArray(arrayObject) {
        if (Array.isArray(arrayObject)) {
            return arrayObject[Math.floor(Math.random() * arrayObject.length)];
        }
        return undefined;
    }
}

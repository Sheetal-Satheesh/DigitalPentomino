class Visual {

    constructor(pd) {

        //convenience

        this.pd = pd;
        this.gameController = pd.gameController;
        this.boardX = Math.floor((this.pd.gameHeight - this.gameController.getBoardSize()[0]) / 2);
        this.boardY = Math.floor((this.pd.gameWidth - this.gameController.getBoardSize()[1]) / 2);
        this.pieces = this.gameController.getPentominoes();

        //Create all visual structures of the game

        this.renderBoard();
        this.renderPieces();

        //Create interaction listeners

        // this.initalizeListeners();
    }

    //Create the field on which pieces can be put
    renderBoard() {

        //TODO: Check whether in the innerHTML approach is good here!

        var fieldHTML = document.getElementById('field');


        var out = '';

        var width = 90 / this.pd.gameWidth;

        //The field consists of divs. Each div saves in its id field its resepective
        //coorinates

        for (var row = 0; row < this.pd.gameHeight; row++) {
            for (var col = 0; col < this.pd.gameWidth; col++) {

                var isBoard = true;

                //indicate where on the field the board is

                //TODO: Implement blocked elements

                if (col < this.boardY) isBoard = false;
                if (col >= this.boardY + this.gameController.getBoardSize()[1]) isBoard = false;
                if (row < this.boardX) isBoard = false;
                if (row >= this.boardX + this.gameController.getBoardSize()[0]) isBoard = false;

                //TODO: This is ugly!

                out += '<div class="gamearea ' + ((isBoard) ? 'boardarea' : '') + '" id="field_' + col + ',' + row + '" title="' + col + ',' + row + '" style="width:' + width + 'vw;height:' + width + 'vw;"></div>';   //'+col+','+row+'
            }
        }

        fieldHTML.innerHTML = out;
    }

    //Create the visual representations of the pieces
    renderPieces() {

        //TODO: Check whether in the innerHTML approach is good here!
        //
        //Thoughts: It is okay if renderPieces is only called at the start
        //of a game and pice updates are handeled differently.
        //
        //If this function should also handle updates, it should rather check
        //whether elements already exist and update their respective properties
        //instead of creating the pieces again and again.

        var pieceArea = document.getElementById('piecearea');

        let out = '';

        var width = 90 / this.gameWidth;

        //create the pieces

        this.pieces.forEach(piece => {
            let bitMap = piece.getMatrixRepresentation();

            //this are the bouding boxes into which the piece itself is "painted"
            //setting to display:none avoids the appearing for a split second before positioning

            out += '<div class="piece" id="piece_' + piece.name + '" style="width:' + (5 * width) + 'vw;height:' + (5 * width) + 'vw;display:none">';

            //this "paints" the bitmap of the pice into the bounding box
            for (var i in bitMap) {
                var row = bitMap[i];
                for (var j in row) {
                    var set = bitMap[i][j];
                    if (piece.name == "F")//For different color for different piece
                    {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:blue' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "I") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:red' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "L") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:yellow' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "N") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:green' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "P") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:purple' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "T") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:coral' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "U") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:lime' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "V") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:chocolate' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "W") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:maroon' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "X") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:peru' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "Y") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:brown' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else if (piece.name == "Z") {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:indigo' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
                    else {
                        out += '<div style="display:block;float:left;width:' + width + 'vw;height:' + width + 'vw;' + ((set) ? 'background:black' : '') + '" class="' + ((set) ? 'bmPoint' : 'bmAround') + '"></div>';
                    }
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

    positionPiece(piece) {

        var width = 90 / this.pd.gameWidth;
        var htmlElement = document.getElementById('piece_' + piece.name);

        if (false) {  //TODO: piece.inTray needs to be added
            var trayPosition = piece.trayPosition;

            var widthVW = 10 + (piece.trayPosition) * 7; //7 is trayHeight

            var magnification = 6 / (5 * width);

            htmlElement.style.left = widthVW + 'vw';
            htmlElement.style.transform = 'scale(' + magnification + ')';
            htmlElement.style.transformOrigin = '0 5%';

        } else {

            let [positionY, positionX] = this.gameController.getPositionOfPentomino(piece);
            var left = this.boardY + 10 + width * (positionY - 2);
            var top = this.boardX + 7 + width * (positionX - 2);

            htmlElement.style.left = left + 'vw';
            htmlElement.style.top = top + 'vw';
            htmlElement.style.transform = 'scale(1)';
            htmlElement.style.transformOrigin = '50% 50%';

        }

        //making the element visible (see remark in renderPieces)
        htmlElement.style.display = 'block';

    }

    //show or hide the manipulation buttons
    //TODO: Dirty! The UI needs to sensibly handle those things!!

    showManipulations(piece) {
        // console.log("Show Manipulation::",piece)		
        document.getElementById('operations').style.display = 'block';
    }

    hideManipulations() {
        document.getElementById('operations').style.display = 'none';
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

        //pointer events generalize mouse and touch events
        //the events are registered on the document object
        //in order to avoid problems of losing objects when moving too fast
        //(which can happen in mouse interaction).
        //
        //Ad differnt things have to happen in relation to different
        //kinds of objects and in different states of the application
        //this basically becomes a big state automaton.

        document.onpointerdown = function (event) {//clicking or moving begins

            //check, whether action started on a gamepiece

            //get all elements on the given positions and go through them.
            //This has to be done instead of getting the element which has been
            //clicked onto from the event, as transparent parts of
            //bounding box pieces can overlap other pieces, so the element
            //which is technically clicked onto may not be the one visually
            //clicked onto. But we need that one.

            var elements = document.elementsFromPoint(event.clientX, event.clientY);

            for (var i in elements) {
                var check = elements[i].className;
                if (check !== 'bmPoint') continue;

                //as soon as we have a bmPoint(an element of a piece), 
                //we determine the bounding box and the piece object itself
                //and save those into a global variable "currentlyMoving"
                //which we access during movement and at the end of movement.

                var piece = elements[i * 1 + 1].id.split('_')[1];

                if (!piece) return;

                var container = elements[i * 1 + 1];       //For some strange reason, i is a String, using *1 to convert it
                var piece = that.PD.game.get(piece);

                window.currentlyMoving = [container, piece];
            }

            return;

        }

        document.onpointermove = function (event) {

            //move an object in case a drag operation stared on a piece (see above)

            if (window.currentlyMoving) {

                var x = event.clientX;
                var y = event.clientY;

                var container = window.currentlyMoving[0];

                //resize object to full size while moving and attach their center to the
                //pointer

                var width = 90 / that.PD.game.width;

                container.style.left = 'calc(' + x + 'px - ' + (width * 2.5) + 'vw)';
                container.style.top = 'calc(' + y + 'px - ' + (width * 2.5) + 'vw)';
                container.style.transform = 'scale(1)';
                container.style.transformOrigin = '50% 50%';

            }
        }

        document.onpointerup = function (event) {

            //this is called when mouse key is released or fingers are removed from the screen

            if (window.currentlyMoving) {

                //in case an object was in the process of being moved, this changes the movement.
                //which means it is determined, where it was moved to and then the backend is informed
                //about that movement (which in turn  repositions the element so it snaps to the grid)

                var data = window.currentlyMoving;
                window.currentlyMoving = false;

                //determine the target

                var elements = document.elementsFromPoint(event.clientX, event.clientY);

                for (var i in elements) {
                    var element = elements[i];
                    var id = element.id;

                    //determine the position the piece ended on

                    if (id == 'tray') return data[1].toTray();

                    if (id.split('_')[0] == 'field') {

                        var coords = (id.split('_')[1].split(','));

                        data[1].place(coords[0], coords[1]);

                        // make this the selected element which activates manipulation GUI

                        data[1].select();

                        //	<!-- var obj = JSON.parse(localStorage.getItem('SAVEGAME')); -->


                        //	<!-- console.log("before",obj[data[1].name]); -->
                        //	<!-- obj[data[1].name]['bitMap'] = data[1].bitMap; -->
                        //	<!-- obj[data[1].name]['inTray'] = data[1].inTray; -->
                        //	<!-- obj[data[1].name]['position'] = data[1].position; -->


                        //	<!-- localStorage.setItem('SAVEGAME',JSON.stringify(obj)); -->
                        //	<!-- console.log("after",localStorage.getItem('SAVEGAME')); -->

                        that.PD.ui.save();

                        return;

                    }
                }


            } else {

                // in case nothing was moving, this becomes an unselect operation

                var elements = document.elementsFromPoint(event.clientX, event.clientY);

                for (var i in elements) {
                    var element = elements[i];
                    if (element.id == 'functions') return; //do not unselect if operations have been applied to the functions panel
                }

                that.game.deleteSelection();

            }
        }

    }

}

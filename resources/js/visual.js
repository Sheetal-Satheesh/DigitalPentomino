const UIProperty = {
    "TrayCSSLeft": 7,
    "TrayHeight": 7,
    "WindowWidth": 89,
    "PentominoX": 5,
    "PentominoY": 5,
    "FunctionWidth": 10
}
Object.freeze(UIProperty);

const CommandTypes = { "Original": 1, "Shadow": 2 };
Object.freeze(CommandTypes);

const CommandSeq = { "Forward": 1, "Backward": 2 };
Object.freeze(CommandSeq);

function updateCommandAttr(cmdType, cmdSeq) {
    return {
        "cmdType": cmdType,
        "cmdSeq": cmdSeq
    }
}

const cmdAttrDefault = updateCommandAttr(CommandTypes.Original, CommandSeq.Forward);

let lastHintedPentName = null;
let randomCell;
class Visual {

    constructor(pd, type = "reload") {
        this.pd = pd;
        this.gameController = pd.gameController;
        this.boardX = pd.boardStartX;
        this.boardY = pd.boardStartY;
        this.pieces = this.gameController.getAllPentominoes();
        this.selected = false;
        this.overlapBlock = new OverlapBlock();

        this.renderBoard();
        this.renderPieces();
        this.disablePrefillButton(false);
        this.initalizeListeners();
    }

    reload(pd) {
        this.boardX = pd.boardStartX;
        this.boardY = pd.boardStartY;
        this.pieces = this.gameController.getAllPentominoes();
        this.selected = false;
        this.overlapBlock = new OverlapBlock();

        this.renderBoard();
        this.renderPieces();
        let pentominosInGameArea = this.gameController.getPentominoesInGmArea();
        pentominosInGameArea.forEach((pentomino) => {
            this.positionPiece(pentomino);
        });
    }

    getBoard() {
        return this.gameController.getName();
    }

    isBlockCell(posX, posY) {
        var bCellsFnd = false;
        if (this.pd.blockedCells != undefined) {
            this.pd.blockedCells.forEach(function (cells) {
                if (cells[0] + this.boardX == posX && cells[1] + this.boardY == posY) {
                    bCellsFnd = true;
                }
            }, this);
        }

        return bCellsFnd;
    }

    isPentominoInBlockCells(pentomino) {
        var [pX, pY] = this.gameController.getPositionOfPentomino(pentomino);
        var pMatrix = pentomino.getMatrixRepresentation();

        for (let i = 0; i < pentomino.iRows; ++i) {
            for (let j = 0; j < pentomino.iCols; ++j) {
                if (pMatrix[i][j] === 1) {
                    let px = (pX - 2) + i;
                    let py = (pY - 2) + j;
                    if (this.isBlockCell(px, py)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    isCollision(pentomino) {
        let collisionPentominoes = this.gameController.getCollisionOfPentominoes(pentomino);
        if (collisionPentominoes.length != 0) {
            return true;
        } else {
            return false;
        }
    }

    placePentomino(pentomino, posX, posY, cmdProperty = cmdAttrDefault) {
        this.gameController.placePentomino(pentomino, posX, posY, cmdProperty);
        this.positionPiece(pentomino);
    }

    removeFromTray(pentomino) {
        if (pentomino.inTray == 0) {
            return;
        }
        this.gameController.removeFromTray(pentomino);
    }

    movePentominoToTray(pentomino, cmdProperty = cmdAttrDefault) {
        this.gameController.addToTray(pentomino);
        this.gameController.removePentomino(pentomino, cmdProperty);
        this.positionPiece(pentomino);
    }

    clear() {
        this.gameController.resetGame();
        this.pieces = this.gameController.getAllPentominoes();
        this.pd.visual.disableManipulations();
        this.renderPieces();
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
                if (this.pd.blockedCells != undefined) {
                    for (var arr = 0; arr < this.pd.blockedCells.length; arr++) {
                        if (row == this.pd.blockedCells[arr][0] + this.pd.boardStartX &&
                            col == this.pd.blockedCells[arr][1] + this.pd.boardStartY) {
                            blockedCell = true;
                            break;
                        }
                    }

                    if (blockedCell)
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

            out += '<div class="piece" id="piece_' + piece.name + '" style="width:' + (5 * width) + 'vw;height:' + (5 * width) + 'vw;display:none;z-index:0;">';

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

    positionPiece(piece) {

        var width = UIProperty.WindowWidth / this.pd.gameWidth;
        var htmlElement = document.getElementById('piece_' + piece.name);

        if (piece.inTray) {
            var widthVW = UIProperty.TrayCSSLeft + (piece.trayPosition) * 7;
            var magnification = 6 / (5 * width);
            htmlElement.style.left = widthVW + 'vw';
            htmlElement.style.top = '-5.5vw';
            // htmlElement.style.transformOrigin = 'top';
            htmlElement.style.setProperty("--magnification", magnification);
            htmlElement.style.setProperty("--rotationX", "0deg");
            htmlElement.style.setProperty("--rotationY", "0deg");
            htmlElement.style.setProperty("--rotationZ", "0deg");

        }
        else {

            var bCellsFnd = this.isPentominoInBlockCells(piece);
            var collisonFnd = this.isCollision(piece);
            if (collisonFnd) {
                let collisonPentomino = this.gameController.getCollisionOfPentominoes(piece).pop();
                this.overlapBlock.add(piece, collisonPentomino);
            }
            else {
                this.overlapBlock.remove(piece);
            }

            var offset = (bCellsFnd || collisonFnd) ? true : false;
            let [positionY, positionX] = this.gameController.getPositionOfPentomino(piece);
            let left = undefined;
            let top = undefined;
            if (offset) {
                left = UIProperty.FunctionWidth + width * (positionX - 2) + (width / 8);
                top = UIProperty.TrayHeight + width * (positionY - 2) - (width / 8);
            }
            else {
                left = UIProperty.FunctionWidth + width * (positionX - 2);
                top = UIProperty.TrayHeight + width * (positionY - 2);
            }

            htmlElement.style.zIndex = this.overlapBlock.getZIndex(piece);
            htmlElement.style.left = left + 'vw';
            htmlElement.style.top = top + 'vw';
            htmlElement.style.transformOrigin = 'center';
            htmlElement.style.setProperty("--magnification", 1);
        }
        if (htmlElement.style.getPropertyValue("--rotationX") === "") {
            htmlElement.style.setProperty("--rotationX", "0deg");
            htmlElement.style.setProperty("--rotationY", "0deg");
            htmlElement.style.setProperty("--rotationZ", "0deg");

        }

        //making the element visible (see remark in renderPieces)
        htmlElement.style.display = 'block';
    }

    select(piece, xPosition, yPosition) {
        this.selected = piece;
        if (piece.inTray) {
            this.disableManipulations();
        }
        else {
            this.showManipulations(xPosition, yPosition);
        }
    }

    deleteSelection() {
        if (!this.selected) return;
        this.selected = false;
        this.pd.visual.disableManipulations();
    }


    hexToRgb(hex) {
        var rgbFormat = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return rgbFormat ? {
            r: parseInt(rgbFormat[1], 16),
            g: parseInt(rgbFormat[2], 16),
            b: parseInt(rgbFormat[3], 16)
        } : null;
    }
    //Enable or Disable manipulation buttons

    showManipulations(xPosition, yPosition) {
        var pieceMan = document.getElementById('pieceManipulation').firstElementChild;
        var pieceManip = pieceMan.firstElementChild;
        var pieceManipul = pieceManip.firstElementChild;
        var clr = pieceManipul.children;
        for (let i = 0; i < clr.length; i++) {
            var btnClr = clr[i].firstElementChild;
            var colorR = this.hexToRgb(this.selected.color).r;
            var colorG = this.hexToRgb(this.selected.color).g;
            var colorB = this.hexToRgb(this.selected.color).b;
            btnClr.style.background = "rgba(" + [colorR, colorG, colorB, 0.5].join(',') + ")";
        }
        document.getElementById("btnRotateRight").disabled = false;
        document.getElementById("btnRotateLeft").disabled = false;
        document.getElementById("btnFlipH").disabled = false;
        document.getElementById("btnFlipV").disabled = false;

        //set style for left and top value of element, but do not cross borders
        var width = UIProperty.WindowWidth / this.pd.gameWidth;
        var gameWidth = document.getElementById("game").clientWidth;
        var gameHeight = document.getElementById("game").clientHeight;
        if ((xPosition + 15 > gameWidth)) {
            if ((yPosition > 0) && (yPosition < gameHeight)) {
                document.getElementById('pieceManipulation').style.left = 'calc(' + xPosition + 'px - ' + (width * 3) + 'vw)';
                document.getElementById('pieceManipulation').style.top = 'calc(' + yPosition + 'px - ' + (width * 1) + 'vw)';
                document.getElementById('pieceManipulation').style.display = 'block';
            }
        } else {
            document.getElementById('pieceManipulation').style.display = 'block';
            document.getElementById('pieceManipulation').style.left = xPosition + 'px';
            document.getElementById('pieceManipulation').style.top = 'calc(' + yPosition + 'px - ' + (width * 2.5) + 'vw)';
        }

    }

    disableManipulations() {

        document.getElementById("btnRotateRight").disabled = true;
        document.getElementById("btnRotateLeft").disabled = true;
        document.getElementById("btnFlipH").disabled = true;
        document.getElementById("btnFlipV").disabled = true;
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

            //close seedbar
            if (!event.target.matches('.seed') && !event.target.matches('.cSeedBtn')) {
                closeSeeding();
            }

            //check if a button is clicked
            let buttonOverPiece = false;
            let settingsEnabled = false;
            for (let j in elements) {
                let precheck = elements[j].className;
                if (precheck == 'controlButton') {
                    buttonOverPiece = true;
                }
                if (precheck == 'settings-popup') {
                    settingsEnabled = true;
                }
            }

            for (var i in elements) {
                var check = elements[i].className;
                //if button is clicked, forget the rest

                if (check !== 'bmPoint') continue;

                if (buttonOverPiece) continue;

                if (settingsEnabled) continue;

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
                break;
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
                        container.style.top = 'calc(' + y + 'px - ' + (width * 2.5) + 'vw)';
                        container.style.transformOrigin = '50% 50%';
                        container.style.zIndex = 100;
                        container.style.setProperty("--magnification", 1);
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

            if (onpointerdownX == event.clientX &&
                onpointerdownY == event.clientY &&
                window.currentlyMoving) {
                let data_ = window.currentlyMoving;
                window.currentlyMoving = false;
                that.positionPiece(data_[1]);
                that.select(data_[1], event.clientX, event.clientY);
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
                    /**
                     * when piece is moved back to tray reset Pentomio inTray variable to 1 and place the 
                     * piece in Tray */
                    if (id == 'tray') {
                        let piece = data[1];
                        that.positionPiece(piece);
                        that.movePentominoToTray(piece);
                        that.disableManipulations();
                    }

                    if (id.split('_')[0] == 'field') {
                        var coords = (id.split('_')[1].split(','));
                        that.removeFromTray(data[1]);
                        that.placePentomino(data[1], coords[0], coords[1]);
                        that.showNumberOfPossibleSolutions();
                        /**
                         * make this the selected element which activates manipulation GUI data[1].select();
                         *
                         * TODO: Make buttons disappear/appear if nothing/something is selected
                         */
                        that.select(data[1], event.clientX, event.clientY);
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

    rotateClkWise(cmdProperty = cmdAttrDefault) {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationZ").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = flipped ? currentRot - 90 : currentRot + 90;
            // Update the backend
            this.gameController.rotatePentominoClkWise(piece, cmdProperty);
            this.positionPiece(piece);
            pieceDiv.style.setProperty("--rotationZ", newRot.toString() + "deg");
        }
    }

    rotateAntiClkWise(cmdProperty = cmdAttrDefault) {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationZ").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = flipped ? currentRot + 90 : currentRot - 90;
            // Update the backend
            this.gameController.rotatePentominoAntiClkWise(piece, cmdProperty);
            this.positionPiece(piece);
            pieceDiv.style.setProperty("--rotationZ", newRot.toString() + "deg");
        }
    }

    flipH(cmdProperty = cmdAttrDefault) {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationX").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = currentRot + 180;
            // Update the backend
            this.gameController.mirrorPentominoH(piece, cmdProperty);
            this.positionPiece(piece);
            pieceDiv.style.setProperty("--rotationX", newRot.toString() + "deg");
            pieceDiv.setAttribute("flipped", 1 - flipped);
        }
    }

    flipV(cmdProperty = cmdAttrDefault) {
        let piece = this.selected;
        if (piece) {
            let pieceDiv = document.getElementById("piece_" + piece.name);
            let flipped = pieceDiv.getAttribute("flipped") * 1;
            let currentRot = pieceDiv.style.getPropertyValue("--rotationY").split(/(-?\d+)/)[1] * 1; //converts string value to int
            let newRot = currentRot + 180;
            // Update the backend
            this.gameController.mirrorPentominoV(piece, cmdProperty);
            this.positionPiece(piece);
            pieceDiv.style.setProperty("--rotationY", newRot.toString() + "deg");
            pieceDiv.setAttribute("flipped", 1 - flipped);
        }
    }

    showNumberOfPossibleSolutions() {
        let labelPossibleSolutions = document.getElementById("labelNumberSolutions");
        labelPossibleSolutions.innerText = this.gameController.getHint().getPossibleSolutions().length;
    }

    callHintAI() {
        let hintElement = document.getElementById("myHint");
        hintElement.classList.toggle("show");
        hintElement.style.visibility = "visible";
        let popupText = document.getElementById("myHint");
        let hint = pd.gameController.getHint();
        let hintCommand = hint.getCommands()[0];
        let hintinPen = hintCommand._pentomino;
        popupText.textContent = this.generateHintText(hint);
        this.indicateHint(hint);
    }

    generateHintText(hint) {
        let text = "";

        if (hint.getPossibleSolutions().length === 0) {
            text += "This doesn't look right. The pentominoes on your board aren't part of a solution."
        }
        let command = hint.getCommands()[0];
        let cmdValues = command.ExecValues();
        switch (command.Name()) {
            case "Remove":
                text += "This doesn't look right. Why don't you remove " + command._pentomino.name;
                break;
            case "MoveToPosition":
                text += "Maybe try to move " + command._pentomino.name + " to position [" + cmdValues.PosX + "," + cmdValues.PosY + "]";
                break;
            case "Place":
                text += "Why don't you place " + command._pentomino.name + " at position [" + cmdValues.PosX + "," + cmdValues.PosY + "]";
                break;
            case "RotateClkWise":
                text += "Why don't you try to rotate " + command._pentomino.name + " clock-wise";
                break;
            case "RotateAntiClkWise":
                text += "Why don't you try to rotate " + command._pentomino.name + " anti-clock-wise";
                break;
            case "MirrorH":
                text += "Why don't you try to mirror " + command._pentomino.name + " horizontal";
                break;
            case "MirrorV":
                text += "Why don't you try to mirror " + command._pentomino.name + " vertical";
                break;
            default:
                text += "Error - unknown command with name '" + command.Name() + "'";
                throw new Error("Error: unknown command with name " + command.Name());
        }
        return text;
    }

    blinkCells(cells, bgColor, blinkColor) {
        let menu = [];

        for (let i = 0; i < cells.length; i++) {
            let fv = document.getElementById("field_" + cells[i][0] + "," + cells[i][1]);
            fv.style.background = blinkColor;
            menu.push(fv);
        }
        let blinkInterval;
        let counter = 0;
        clearInterval(blinkInterval);
        blinkInterval = setInterval(function () {
            for (let j = 0; j < menu.length; j++) {
                if (counter % 2 === 0) {
                    menu[j].style.background = bgColor;
                } else {
                    menu[j].style.background = blinkColor;
                }
            }
            counter++;
            if (counter > 4) {
                clearInterval(blinkInterval);
            }
        }, 100);
    }

    indicateHint(hint) {
        let timeoutFrame = 500;
        //possible command names (place, remove, moveToPosition, rotateClkWise, rotateAntiClkWise, mirrorH, mirrorV)
        let hintCommand = hint.getCommands()[0];
        let hintSkill = hint._skill;
        let hintName = hintCommand._name;
        let hintinPen = hintCommand._pentomino;
        let pentominoColor = hintinPen.color;
        let clientRect = document.getElementById("piece_" + hintinPen.name).getBoundingClientRect();
        let [posX, posY] = [clientRect.x + clientRect.width / 2, clientRect.y + clientRect.height / 2];
        let currentPenHintName = hintinPen.name;
        //let currentPenHintNaame = this.selected.name;
        if (!(currentPenHintName === lastHintedPentName)) {
            randomCell = Math.floor(Math.random() * (4)) + 1;
            lastHintedPentName = currentPenHintName;
        }


        //indication of unoccupied cells
        if (!(hintSkill === null)) {
            console.log("Skill (inside loop): " + hintSkill);
            const DEFAULT_BG_COLOR = "#adc0b9";
            const RED_COLOR = "red";
            //blink unoccupied cells
            this.blinkCells(hintSkill, DEFAULT_BG_COLOR, RED_COLOR);
        }
        else {
            switch (hintName) {
                case "Place":
                    // handle place hint
                    let hintRow = hintCommand._nextPosition[0];
                    let hintColumn = hintCommand._nextPosition[1];
                    let fieldvalue;
                    let prevBackground = [];

                    //indicate piece to be moved (and fade away)
                    Array.prototype.forEach.call(document.getElementById("piece_" + hintinPen.name).getElementsByClassName("bmPoint"), function (element) {
                        element.style["box-shadow"] = "0 0 20px " + pentominoColor;
                        setTimeout(function () {
                            element.style.removeProperty("box-shadow");
                        }, timeoutFrame * 4);
                    });

                    //show destination position (and fade away)
                    let piecePos = this.getOccupiedPositions(hintinPen, hintCommand);
                    //console.log("hintingPen",hintinPen, piecePos);
                    //usage of random cell variable to indicate hinting
                    for (let i = 0; i < randomCell; i++) {
                        fieldvalue = document.getElementById("field_" + piecePos[i][0] + "," + piecePos[i][1]);
                        prevBackground[i] = fieldvalue.style.background;
                        fieldvalue.style.background = pentominoColor;
                        this.hide(piecePos, prevBackground);
                    }

                    break;

                case "Remove":
                    // handle remove hint
                    this.select(hintinPen, posX, posY);
                    var pen = document.getElementById("piece_" + hintinPen.name);
                    //console.log("pent",hintinPen,this.selected);
                    if (!this.selected.inTray) {
                        pen.style.display = 'none';
                        setTimeout(function () {
                            pen.style.display = 'block';
                        }, 2000);
                    }
                    break;

                case "RotateClkWise":
                    // handle rotateClkWise hint
                    this.select(hintinPen, posX, posY);
                    if (!this.selected.inTray) {
                        rotateClkWise();
                        setTimeout(function () {
                            rotateAntiClkWise();
                        }, timeoutFrame);
                    }


                    break;

                case "RotateAntiClkWise":
                    // handle rotateAntiClkWise hint
                    this.select(hintinPen, posX, posY);
                    if (!this.selected.inTray) {
                        rotateAntiClkWise();
                        setTimeout(function () {
                            rotateClkWise();
                        }, timeoutFrame);
                    }
                    break;

                case "MirrorH":
                    // handle mirrorH hint
                    //select piece in the UI to flip
                    this.select(hintinPen, posX, posY);
                    if (!this.selected.inTray) {
                        flipH();
                        setTimeout(function () {
                            flipH();
                        }, timeoutFrame);
                    }
                    break;

                case "MirrorV":
                    // handle mirrorV hint
                    this.select(hintinPen, posX, posY);
                    if (!this.selected.inTray) {
                        flipV();
                        setTimeout(function () {
                            flipV();
                        }, timeoutFrame);
                    }
                    break;

                default:
                    console.log("Unknown piece action detected!");
            }

        }
    }

    hide(piecePos, prevBackground) {

        setTimeout(function () {
            for (let j = 0; j < 5; j++) {
                let fvalue = document.getElementById("field_" + piecePos[j][0] + "," + piecePos[j][1]);
                //TODO: replace with proper fadeOut animation
                fvalue.style.background = prevBackground[j];
            }
        }, 70);
    }

    getOccupiedPositions(piece, hintCommand) {

        let PiecePostions = [];
        let hintRow = hintCommand._nextPosition[0];
        let startRow = hintRow - 2;
        let hintColumn = hintCommand._nextPosition[1];
        let startColumn = hintColumn - 2;
        let occupiedPosArray = [];

        let pieceBitmap = piece.getMatrixRepresentation();

        //add all elements of current 5*5 overlay on board where piece matrix has 1's
        let k = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let piecePos = [];
                if (pieceBitmap[i][j] == "1") {
                    //add to occupiedPosArray
                    piecePos[0] = i + startRow;
                    piecePos[1] = j + startColumn;
                    occupiedPosArray[k] = piecePos;
                    k++;
                }
            }
        }

        return occupiedPosArray;
    }

    disablePrefillButton(bValue) {
        document.getElementById("prefillBoard").disabled = bValue;
    }

    prefillBoard() {
        this.clear();
        // Prevent clicking of button while previous prefilling is going on
        this.disablePrefillButton(true);
        let allSolutions = [];
        // Get all the games and filter solutions
        if (this.allSolutions == undefined) {
            this.gameController.getSolutions().forEach(game =>
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
            this.disablePrefillButton(false);
            throw new Error("Solutions not found for current board!!!");
        }

        if (randomSolution != undefined) {
            for (let i = 0; i < randomSolution[0].length; ++i) {
                piecePosition = randomSolution[0][i];
                piece = randomSolution[1][i];
                currentAnchor = [piecePosition.boardPosition[0] + this.boardX,
                piecePosition.boardPosition[1] + this.boardY];
                for (let j = 0; j < positions.length; ++j) {
                    bOverlap = false;
                    candidateAnchor = [positions[j][0], positions[j][1]];
                    if (Math.sqrt(
                        Math.pow((currentAnchor[0] - candidateAnchor[0]), 2) +
                        Math.pow((currentAnchor[1] - candidateAnchor[1]), 2)) < 2.2) {
                        bOverlap = true;
                        break;
                    }
                }
                if (bOverlap) {
                    piece = new Pentomino(piece.name);
                    prefillCandidates.push(piece);
                    continue;
                }
                prefillCandidates.push(piece);
                positions.push(currentAnchor);
                this.removeFromTray(piece);
                piece.updateTrayValue(0);
                this.gameController.placePentomino(piece, currentAnchor[0], currentAnchor[1]);
            }
        } else {
            this.disablePrefillButton(false);
            throw new Error("Could not find a random solution!!!"); //TODO: Need more meaningful error message here
        }
        this.pieces = prefillCandidates;
        this.renderPieces();
        // So that pieces are rendered before the button becomes enabled
        setTimeout(function (that) {
            that.disablePrefillButton(false);
        }, 100, this);
    }

    _getRandomElementFromArray(arrayObject) {
        if (Array.isArray(arrayObject)) {
            return arrayObject[Math.floor(Math.random() * arrayObject.length)];
        }
        return undefined;
    }

    execShadowCmd(command, seqType) {
        let cmdProperty = updateCommandAttr(CommandTypes.Shadow, seqType);
        switch (command.name) {
            case "Remove":
            case "Place":
                if ((command.PosX == undefined) &&
                    (command.PosY == undefined)) {
                    if (command.Pentomino.inTray == 1) {
                        break;
                    }
                    command.Pentomino.updateTrayValue(1);
                    this.movePentominoToTray(
                        command.Pentomino,
                        cmdProperty);
                    this.positionPiece(command.Pentomino);
                }
                else {
                    command.Pentomino.inTray = 0;
                    this.placePentomino(
                        command.Pentomino,
                        command.PosX,
                        command.PosY,
                        cmdProperty);
                }

                break;

            case "RotateClkWise":
                this.selected = command.Pentomino;
                this.rotateClkWise(cmdProperty);
                break;

            case "RotateAntiClkWise":
                this.selected = command.Pentomino;
                this.rotateAntiClkWise(cmdProperty);
                break;

            case "MirrorH":
                this.selected = command.Pentomino;
                this.flipH(cmdProperty);
                break;

            case "MirrorV":
                this.selected = command.Pentomino;
                this.flipV(cmdProperty);
                break;

            default:
                //TODO: add commund related flag variable
                throw new Error("Can not undo");

        }
    }

    getCmdState(stateType) {
        if (stateType == "start") {
            return this.gameController.getStartCmdKey();
        }
        else {
            return this.gameController.getCurrentCmdKey()
        }
    }

    getGameStates() {
        let cmdKeySequences = this.gameController.getCmdKeySequences();
        return cmdKeySequences;
    }

    undo() {
        let command = this.gameController.undo();
        if (command == undefined) {
            return;
        }
        this.execShadowCmd(command);
    }

    redo() {
        let command = this.gameController.redo();
        if (command == undefined) {
            return;
        }
        this.execShadowCmd(command);
    }

    getGameIdByKey(key) {
        return this.gameController.getGameIdByKey(key);
    }
    saveGameImage(image) {
        this.gameController.saveGameImage(image);
    }

    showGameImages() {
        let gameImages = this.gameController.getGameImages();
        return gameImages;
    }

    deleteGameImage(key) {
        this.gameController.deleteGameImage(key);
    }

    loadGame(key) {
        this.gameController.loadGame(key);
    }

    loadGameState(targetStateKey) {
        let currentCmdKey = this.gameController.getCurrentCmdKey();
        if (currentCmdKey == undefined) {
            currentCmdKey = this.gameController.getStartCmdKey();
        }
        let [cmdSequences, seqType] = this.gameController.getCmdSequences(currentCmdKey, targetStateKey);
        for (let indx = 0; indx < cmdSequences.length; indx++) {
            this.execShadowCmd(cmdSequences[indx], seqType);
        }
    }

    replay(startKey, targetKey) {
        console.log("Start Cmd Key: " + this.gameController.getStartCmdKey());
        console.log("Current Cmd Key: " + this.gameController.getCurrentCmdKey());
        console.log("Last Cmd Key: " + this.gameController.getLastCmdKey());

        if (startKey.length == 0) {
            startKey = this.gameController.getStartCmdKey();
            if (startKey == undefined) {
                console.error("Game is not Started yet");
                return;
            }
        }

        if (targetKey.length == 0) {
            targetKey = this.gameController.getLastCmdKey();
            if (targetKey == undefined) {
                console.error("Game is not Started yet");
                return;
            }
        }

        let [cmdSequences, seqType] = this.gameController.getCmdSequences(startKey, targetKey);
        this.loadGameState(startKey);


        let timeInterval = 100;
        for (let indx = 0; indx < cmdSequences.length; indx++) {
            let command = cmdSequences[indx];
            var that = this;

            setTimeout(function (that, command) {
                that.execShadowCmd(command, seqType);
            }, timeInterval += 500, that, command);
        }

        const pause = function () {
            let replayId = document.getElementById("replay");
            let replayImg = replayId.children[0];
            replayImg.setAttribute('src', 'resources/images/icons/replay.svg');
        };
        setTimeout(pause, timeInterval);

    }

}

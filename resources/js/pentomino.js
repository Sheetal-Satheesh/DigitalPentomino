"use strict";


let Pentomino = function (sPentominoType) {
    this.iRows = 0;
    this.iCols = 0;
    this.sRepr = '';
    let oContext = this;
    switch (sPentominoType) {
        case 'F':
            _createF();
            break;
        case 'L':
            _createL();
            break;
        case 'N':
            _createN();
            break;
        case 'P':
            _createP();
            break;
        case 'Y':
            _createY();
            break;
        case 'T':
            _createT();
            break;
        case 'U':
            _createU();
            break;
        case 'V':
            _createV();
            break;    
        case 'W':
            _createW();
            break;
        case 'Z':
            _createZ();
            break;
        case 'I':
            _createI();
            break;
        case 'X':
            _createX();
            break;
        default:
            throw 'Unexpected Pentomino Type';
    }

    function _createF() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '011110010';        
    }

    function _createL() {
        oContext.iRows = 4;
        oContext.iCols = 2;
        oContext.sRepr = '10101011';        
    }

    function _createN() {
        oContext.iRows = 4;
        oContext.iCols = 2;
        oContext.sRepr = '01011110';       
    }

    function _createP() {
        oContext.iRows = 3;
        oContext.iCols = 2;
        oContext.sRepr = '111110';        
    }

    function _createY() {
        oContext.iRows = 2;
        oContext.iCols = 4;
        oContext.sRepr = '00101111';        
    }

    function _createT() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '111010010';        
    }

    function _createU() {
        oContext.iRows = 3;
        oContext.iCols = 2;
        oContext.sRepr = '101111';        
    }

    function _createV() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '100100111';        
    }

    function _createW() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '100110011';        
    }

    function _createZ() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '110010011';        
    }

    function _createI() {
        oContext.iRows = 1;
        oContext.iCols = 5;
        oContext.sRepr = '11111';        
    }

    function _createX() {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '010111010';        
    }
};

Pentomino = function(sPentominoType) {
    this.iRows = 0;
    this.iCols = 0;
    this.sRepr = '';
    let oContext = this;
    switch (sPentominoType) {
        case 'F':
            _createF(oContext);
            break;
        case 'L':
            _createL(oContext);
            break;
        case 'N':
            _createN(oContext);
            break;
        case 'P':
            _createP(oContext);
            break;
        case 'Y':
            _createY(oContext);
            break;
        case 'T':
            _createT(oContext);
            break;
        case 'U':
            _createU(oContext);
            break;
        case 'V':
            _createV(oContext);
            break;    
        case 'W':
            _createW(oContext);
            break;
        case 'Z':
            _createZ(oContext);
            break;
        case 'I':
            _createI(oContext);
            break;
        case 'X':
            _createX(oContext);
            break;
        default:
            throw 'Unexpected Pentomino Type';
    }
    
    function _createF(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '011110010';        
    }

    function _createL(oContext) {
        oContext.iRows = 4;
        oContext.iCols = 2;
        oContext.sRepr = '10101011';        
    }

    function _createN(oContext) {
        oContext.iRows = 4;
        oContext.iCols = 2;
        oContext.sRepr = '01011110';       
    }

    function _createP(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 2;
        oContext.sRepr = '11111110';        
    }

    function _createY(oContext) {
        oContext.iRows = 2;
        oContext.iCols = 4;
        oContext.sRepr = '00101111';        
    }

    function _createT(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '111010010';        
    }

    function _createU(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 2;
        oContext.sRepr = '101111';        
    }

    function _createV(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '100100111';        
    }

    function _createW(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '100110011';        
    }

    function _createZ(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '110010011';        
    }

    function _createI(oContext) {
        oContext.iRows = 1;
        oContext.iCols = 5;
        oContext.sRepr = '11111';        
    }

    function _createX(oContext) {
        oContext.iRows = 3;
        oContext.iCols = 3;
        oContext.sRepr = '010111010';        
    }
};
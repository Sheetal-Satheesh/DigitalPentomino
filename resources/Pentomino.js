class Pentomino {
    constructor(sPentominoType) {
        this.iRows = 0;
        this.iCols = 0;
        this.sRepr = '';
        switch (sPentominoType) {
            case 'F':
                this._createF();
                break;
            case 'L':
                this._createL();
                break;
            case 'N':
                this._createN();
                break;
            case 'P':
                this._createP();
                break;
            case 'Y':
                this._createY();
                break;
            case 'T':
                this._createT();
                break;
            case 'U':
                this._createU();
                break;
            case 'V':
                this._createV();
                break;    
            case 'W':
                this._createW();
                break;
            case 'Z':
                this._createZ();
                break;
            case 'I':
                this._createI();
                break;
            case 'X':
                this._createX();
                break;
            default:
                throw 'Unexpected Pentomino Type';
        }
    }

    _createF() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '011110010';        
    }

    _createL() {
        this.iRows = 4;
        this.iCols = 2;
        this.sRepr = '10101011';        
    }

    _createN() {
        this.iRows = 4;
        this.iCols = 2;
        this.sRepr = '01011110';       
    }

    _createP() {
        this.iRows = 3;
        this.iCols = 2;
        this.sRepr = '11111110';        
    }

    _createY() {
        this.iRows = 2;
        this.iCols = 4;
        this.sRepr = '00101111';        
    }

    _createT() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '111010010';        
    }

    _createU() {
        this.iRows = 3;
        this.iCols = 2;
        this.sRepr = '101111';        
    }

    _createV() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '100100111';        
    }

    _createW() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '100110011';        
    }

    _createZ() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '110010011';        
    }

    _createI() {
        this.iRows = 1;
        this.iCols = 5;
        this.sRepr = '11111';        
    }

    _createX() {
        this.iRows = 3;
        this.iCols = 3;
        this.sRepr = '010111010';        
    }
}
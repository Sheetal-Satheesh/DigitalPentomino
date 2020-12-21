"use strict";
const I_COLS = 5;
const I_ROWS = 5;


class Pentomino {
    constructor(sPentominoType) {
        this.name = sPentominoType;
        this.iRows = 0;
        this.iCols = 0;
        this.sRepr = '';
        switch (sPentominoType) {
            case 'F':
                this.iRows = 3;
                this.iCols = 3; 
                this.sRepr = '0000000110011000010000000';
                break;
            case 'L':
                this.iRows = 4;
                this.iCols = 2;
                this.sRepr = '0010000100001000011000000';
                break;
            case 'N':
                this.iRows = 4;
                this,iCols = 2;
                this.sRepr = '0010000100011000100000000';
                break;
            case 'P':
                this.iRows = 3;
                this.iCols = 2;
                this.sRepr = '0000001100011000100000000';
                break;
            case 'Y':
                this.iRows = 2;
                this.iCols = 4;
                this.sRepr = '0000000000001001111000000';
                break;
            case 'T':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '0000001110001000010000000';
                break;
            case 'U':
                this.iRows = 2;
                this.iCols = 3;
                this.sRepr = '0000000000010100111000000';
                break;
            case 'V':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '0000001000010000111000000';
                break;
            case 'W':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '0000001000011000011000000';
                break;
            case 'Z':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '0000001100001000011000000';
                break;
            case 'I':
                this.iRows = 5;
                this.iCols = 1;
                this.sRepr = '0010000100001000010000100';
                break;
            case 'X':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '0000000100011100010000000';
                break;
            default:
                throw 'Unexpected Pentomino Type';
        }
    }

    rotateClkWise() {
        let aNewRepr = [];

        for (let i = I_COLS; i > 0; --i) {
            for (let j = I_ROWS; j > 0; --j) {
                aNewRepr.push(this.sRepr[I_COLS * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    rotateAntiClkWise() {
        let aNewRepr = [];

        for (let i = 1; i <= I_COLS; ++i) {
            for (let j = 1; j <= I_ROWS; ++j) {
                aNewRepr.push(this.sRepr[I_COLS * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    mirrorH() {
        let aNewRepr = [];

        for (let i = I_ROWS - 1; i >= 0; --i) {
            for (let j = 0; j < I_COLS; ++j) {
                aNewRepr.push(this.sRepr[I_COLS * i + j]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    mirrorV() {
        let aNewRepr = [];

        for (let i = 1; i <= I_ROWS; ++i) {
            for (let j = 1; j <= I_ROWS; ++j) {
                aNewRepr.push(this.sRepr[I_ROWS * i - j]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    getMatrixRepresentation() {
        let aPentomino = Array(5).fill(0).map(() => new Array(5).fill(0));
        for (let i = 0; i < I_ROWS; ++i) {
            for (let j = 0; j < I_COLS; ++j) {
                aPentomino[i][j] = parseInt(this.sRepr[i * I_COLS + j]);
            }
        }

        return aPentomino;
    }

    display() {
        let aTemp = '';
        for(let i = 0; i < I_ROWS; ++i){
            aTemp = '|';
            for(let j = 0; j < I_COLS; ++j)
                aTemp = aTemp.concat(   this.sRepr[i*I_COLS+j]);
            console.log(aTemp.concat('|'));
        }
    }
}
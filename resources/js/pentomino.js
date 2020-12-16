"use strict";


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
                this.sRepr = '011110010';
                break;
            case 'L':
                this.iRows = 4;
                this.iCols = 2;
                this.sRepr = '10101011';
                break;
            case 'N':
                this.iRows = 4;
                this.iCols = 2;
                this.sRepr = '01011110';
                break;
            case 'P':
                this.iRows = 3;
                this.iCols = 2;
                this.sRepr = '111110';
                break;
            case 'Y':
                this.iRows = 2;
                this.iCols = 4;
                this.sRepr = '00101111';
                break;
            case 'T':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '111010010';
                break;
            case 'U':
                this.iRows = 2;
                this.iCols = 3;
                this.sRepr = '101111';
                break;
            case 'V':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '100100111';
                break;
            case 'W':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '100110011';
                break;
            case 'Z':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '110010011';
                break;
            case 'I':
                this.iRows = 1;
                this.iCols = 5;
                this.sRepr = '11111';
                break;
            case 'X':
                this.iRows = 3;
                this.iCols = 3;
                this.sRepr = '010111010';
                break;
            default:
                throw 'Unexpected Pentomino Type';
        }
    }

    rotateClkWise() {
        let iCols = this.iCols;
        let iRows = this.iRows;
        let aNewRepr = [];

        for (let i = iCols; i > 0; --i) {
            for (let j = iRows; j > 0; --j) {
                aNewRepr.push(this.sRepr[iCols * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
        this.iRows = iCols;
        this.iCols = iRows;
    }

    rotateAntiClkWise() {
        let iCols = this.iCols;
        let iRows = this.iRows;
        let aNewRepr = [];

        for (let i = 1; i <= iCols; ++i) {
            for (let j = 1; j <= iRows; ++j) {
                aNewRepr.push(this.sRepr[iCols * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
        this.iRows = iCols;
        this.iCols = iRows;
    }

    mirrorH() {
        let aNewRepr = [];

        for (let i = this.iRows - 1; i >= 0; --i) {
            for (let j = 0; j < this.iCols; ++j) {
                aNewRepr.push(this.sRepr[this.iCols * i + j]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    mirrorV() {
        let aNewRepr = [];

        for (let i = 1; i <= this.iRows; ++i) {
            for (let j = 1; j <= this.iCols; ++j) {
                aNewRepr.push(this.sRepr[this.iCols * i - j]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    getMatrixRepresentation() {
        let aPentomino = Array(5).fill(0).map(() => new Array(5).fill(0));
        for (let i = 0; i < this.iRows; ++i) {
            for (let j = 0; j < this.iCols; ++j) {
                aPentomino[i][j] = parseInt(this.sRepr[i * this.iCols + j]);
            }
        }

        return aPentomino;
    }
}
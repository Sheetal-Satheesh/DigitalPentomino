"use strict";

const I_COLS = 5;
const I_ROWS = 5;
const COL_ANCHOR = 2;
const ROW_ANCHOR = 2;

class Pentomino {
    constructor(sPentominoType) {
        this.name = sPentominoType;
        this.iRows = I_ROWS;
        this.iCols = I_COLS;
        this.colAnchor = COL_ANCHOR;
        this.rowAnchor = ROW_ANCHOR;
        this.sRepr = '';
        this.trayPosition = -1;
        this.inTray = 1;
        switch (sPentominoType) {
            case 'F':
                this.color = "blue";
                this.trayPosition = 0;
                this.sRepr = '0000000110011000010000000';
                break;
            case 'L':
                this.color = "yellow";
                this.trayPosition = 1;
                this.sRepr = '0010000100001000011000000';
                break;
            case 'N':
                this.color = "green";
                this.trayPosition = 2;
                this.sRepr = '0010000100011000100000000';
                break;
            case 'P':
                this.color = "purple";
                this.trayPosition = 3;
                this.sRepr = '0000001100011000100000000';
                break;
            case 'Y':
                this.color = "coral";
                this.trayPosition = 4;
                this.sRepr = '0000000000001001111000000';
                break;
            case 'T':
                this.color = "lime";
                this.trayPosition = 5;
                this.sRepr = '0000001110001000010000000';
                break;
            case 'U':
                this.color = "chocolate";
                this.trayPosition = 6;
                this.sRepr = '0000001010011100000000000';
                break;
            case 'V':
                this.color = "maroon";
                this.trayPosition = 7;
                this.sRepr = '0000001000010000111000000';
                break;
            case 'W':
                this.color = "peru";
                this.trayPosition = 8;
                this.sRepr = '0000001000011000011000000';
                break;
            case 'Z':
                this.color = "brown";
                this.trayPosition = 9;
                this.sRepr = '0000001100001000011000000';
                break;
            case 'I':
                this.color = "indigo";
                this.trayPosition = 10;
                this.sRepr = '0010000100001000010000100';
                break;
            case 'X':
                this.color = "red";
                this.trayPosition = 11;
                this.sRepr = '0000000100011100010000000';
                break;
            default:
                throw 'Unexpected Pentomino Type: \'' + sPentominoType + '\'';
        }
    }

    getMatrixPosition([anchorRow, anchorCol], [row, col]) {
        return [
            row - anchorRow + this.rowAnchor,
            col - anchorCol + this.colAnchor
        ];
    }

    getCoordinatePosition([anchorRow, anchorCol], [relRow, relCol]) {
        return [
            relRow + anchorRow - this.rowAnchor,
            relCol + anchorCol - this.colAnchor
        ];
    }

    matrixPositionIsValid(row, col) {
        return !(row < 0
            || row >= this.iRows
            || col < 0
            || col >= this.iCols);
    }

    getCharAtMatrixPosition(relRow, relCol) {
        return this.sRepr.charAt(relRow * this.iCols + relCol);
    }

    rotateClkWise() {
        let aNewRepr = [];

        for (let i = this.iCols; i > 0; --i) {
            for (let j = this.iRows; j > 0; --j) {
                aNewRepr.push(this.sRepr[this.iCols * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
    }

    rotateAntiClkWise() {
        let aNewRepr = [];

        for (let i = 1; i <= this.iCols; ++i) {
            for (let j = 1; j <= this.iRows; ++j) {
                aNewRepr.push(this.sRepr[this.iCols * j - i]);
            }
        }

        this.sRepr = aNewRepr.join("");
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
            for (let j = 1; j <= this.iRows; ++j) {
                aNewRepr.push(this.sRepr[this.iRows * i - j]);
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

    display() {
        let aTemp = '';
        for(let i = 0; i < this.iRows; ++i){
            aTemp = '|';
            for(let j = 0; j < this.iCols; ++j)
                aTemp = aTemp.concat(   this.sRepr[i*this.iCols+j]);
            console.log(aTemp.concat('|'));
        }
    }
}

if(typeof module != 'undefined') {
    module.exports = Pentomino;
}

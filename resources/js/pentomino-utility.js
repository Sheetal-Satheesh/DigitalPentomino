"use strict";

function PentominoUtility() {

}

PentominoUtility.prototype.rotateAntiClkWise = function (pentomino) {
    let iCols = pentomino.iCols;
    let iRows = pentomino.iRows;
    let aNewRepr = [];

    for (let i = 1; i <= iCols; ++i) {
        for (let j = 1; j <= iRows; ++j) {
            aNewRepr.push(pentomino.sRepr[iCols * j - i]);
        }
    }

    pentomino.sRepr = aNewRepr.join("");
    pentomino.iRows = iCols;
    pentomino.iCols = iRows;

    return pentomino;
}

PentominoUtility.prototype.rotateClkWise = function (pentomino) {
    let iCols = pentomino.iCols;
    let iRows = pentomino.iRows;
    let aNewRepr = [];

    for (let i = iCols; i > 0; --i) {
        for (let j = iRows; j > 0; --j) {
            aNewRepr.push(pentomino.sRepr[iCols * j - i]);
        }
    }

    pentomino.sRepr = aNewRepr.join("");
    pentomino.iRows = iCols;
    pentomino.iCols = iRows;

    return pentomino;
}

PentominoUtility.prototype.mirrorH = function (pentomino) {
    let aNewRepr = [];

    for (let i = pentomino.iRows - 1; i >= 0; --i) {
        for (let j = 0; j < pentomino.iCols; ++j) {
            aNewRepr.push(pentomino.sRepr[pentomino.iCols * i + j]);
        }
    }

    pentomino.sRepr = aNewRepr.join("");

    return pentomino;
}

PentominoUtility.prototype.mirrorV = function (pentomino) {
    let aNewRepr = [];

    for (let i = 1; i <= pentomino.iRows; ++i) {
        for (let j = 1; j <= pentomino.iCols; ++j) {
            aNewRepr.push(pentomino.sRepr[pentomino.iCols * i - j]);
        }
    }

    pentomino.sRepr = aNewRepr.join("");

    return pentomino;
}

PentominoUtility.prototype.getMatrixRepresentaion = function (pentomino) {
    let aPentomino = Array(5).fill(0).map(() => new Array(5).fill(0));
    for (i = 0; i < pentomino.iRows; ++i) {
        for (j = 0; j < pentomino.iCols; ++j) {
            aPentomino[i][j] = parseInt(pentomino.sRepr[i * pentomino.iCols + j]);
        }
    }

    return aPentomino;
}
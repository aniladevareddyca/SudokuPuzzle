const PuzzleValue = require("./puzzle_value.js");
maxIterations = 1000000;
currentIterationCount = 0;
numbersFrom1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
sudoku = []
initalPuzzle = [];
numbersToGenerate = 20;



class PuzzleService {
    constructor() {
    }
    // Builds Initial puzzle with below format
    //    [[[1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0]],
    //     [[2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0]],
    //     [[3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 0], [3, 9, 0]],

    //     [[4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 0], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 0]],
    //     [[5, 1, 0], [5, 2, 0], [5, 3, 0], [5, 4, 0], [5, 5, 6], [5, 6, 0], [5, 7, 0], [5, 8, 0], [5, 9, 0]],
    //     [[6, 1, 0], [6, 2, 5], [6, 3, 0], [6, 4, 0], [6, 5, 9], [6, 6, 0], [6, 7, 6], [6, 8, 0], [6, 9, 0]],

    //     [[7, 1, 0], [7, 2, 0], [7, 3, 0], [7, 4, 0], [7, 5, 0], [7, 6, 0], [7, 7, 0], [7, 8, 0], [7, 9, 0]],
    //     [[8, 1, 0], [8, 2, 0], [8, 3, 0], [8, 4, 0], [8, 5, 0], [8, 6, 0], [8, 7, 0], [8, 8, 0], [8, 9, 0]],
    //     [[9, 1, 0], [9, 2, 0], [9, 3, 0], [9, 4, 0], [9, 5, 0], [9, 6, 0], [9, 7, 0], [9, 8, 0], [9, 9, 0]],
    // ];
    buildInitialPuzzlewithZeros() {
        initalPuzzle = [];
        for (var row = 1; row <= 9; row++) {
            var puzzle = [];
            for (var col = 1; col <= 9; col++) {
                puzzle.push([row, col, 0]);
                if (col == 9) {
                    initalPuzzle.push(...[puzzle]);
                }
            }
        }
    }

    getNewPuzzle(input) {
        this.buildInitialPuzzlewithZeros();
        var initialPuzzleWithPositions = [];
        this.setValuesAndPositionsToPuzzle();
        for (var row = 0; row < initalPuzzle.length; row++) {
            for (var col = 0; col < initalPuzzle[row].length; col++) {
                initialPuzzleWithPositions.push(new PuzzleValue(initalPuzzle[row][col][0], initalPuzzle[row][col][1], initalPuzzle[row][col][2]));
            }
        }
        return initialPuzzleWithPositions;
    }

    setValuesAndPositionsToPuzzle() {
        var placedNumbersInPuzzle = [];
        while (placedNumbersInPuzzle.length < numbersToGenerate) {
            var rowPosition = this.getRandomNumberBetween1To9();
            var colPosition = this.getRandomNumberBetween1To9();
            while (initalPuzzle[rowPosition - 1][rowPosition - 1][2] != 0) {
                rowPosition = this.getRandomNumberBetween1To9();
                colPosition = this.getRandomNumberBetween1To9();
            }
            var numberToPlace = this.getRandomNumberBetween1To9();
            while (this.isConflict(rowPosition, colPosition, numberToPlace)) {
                numberToPlace = this.getRandomNumberBetween1To9();
            }
            initalPuzzle[rowPosition - 1][colPosition - 1][2] = numberToPlace;
            placedNumbersInPuzzle.push(numberToPlace);
        }
    }

    //check if the number exists in the same row, col or 3/3 grid. If yes then there is a conflict so return true 
    isConflict(row, col, value) {
        var curretGrid = this.get3x3GridValues(row, col, initalPuzzle);
        var cols = this.getColumnValues(col - 1, initalPuzzle);
        if ((initalPuzzle[row - 1].filter(x => x[2] == value)).length !== 0 ||
            (cols.filter(x => x[2] == value).length != 0) ||
            (curretGrid.filter(x => x[2] == value).length != 0
            )) {
            return true
        }
        return false;
    }


    solvePuzzle(input) {
        currentIterationCount =0;
        var sudokuSolution = [];
        this.buildInitialPuzzlewithZeros();
        for (var i = 0; i < input.puzzle.length; i++) {
            initalPuzzle[(input.puzzle[i].row - 1)][(input.puzzle[i].col - 1)][2] = input.puzzle[i].val;
        }
        if (this.buildPuzzleWithValues()) {
            for (var row = 0; row < initalPuzzle.length; row++) {
                for (var col = 0; col < initalPuzzle[row].length; col++) {
                    sudokuSolution.push(new PuzzleValue(initalPuzzle[row][col][0], initalPuzzle[row][col][1], initalPuzzle[row][col][2]));
                }
            }
        } else {
            sudokuSolution.push(0);
        }
        return sudokuSolution;
    }

    buildPuzzleWithValues() {
        currentIterationCount = currentIterationCount + 1;
        if (currentIterationCount > maxIterations){
            return false;
        }
        for (var row = 0; row < numbersFrom1to9.length; row++) {
            for (var col = 0; col < numbersFrom1to9.length; col++) {
                var cols = this.getColumnValues(col, initalPuzzle);
                var curretGrid = this.get3x3GridValues(row + 1, col + 1, initalPuzzle);
                if (initalPuzzle[row][col][2] == 0) {
                    for (var num = 1; num <= numbersFrom1to9.length; num++) {
                        if (((initalPuzzle[row].filter(x => x[2] == num)).length == 0 &&
                            cols.filter(x => x[2] == num).length == 0) &&
                            (curretGrid.filter(x => x[2] == num).length == 0
                            )) {
                            initalPuzzle[row][col][2] = num;
                            if (this.buildPuzzleWithValues()) {
                                return true;
                            }
                            else {
                                initalPuzzle[row][col][2] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    getRandomNumberBetween1To9() {
        return numbersFrom1to9[Math.floor(Math.random() * numbersFrom1to9.length)];
    }

    getColumnValues(col, puzzle) {
        var columns = [];
        for (var i = 0; i < puzzle.length; i++) {
            columns.push(puzzle[i][col]);
        }
        return columns;
    }

    get3x3GridValues(row, col, puzzle) {
        var grid = [];
        var maxRow = 0;
        var maxCol = 0;
        var minRow = 0;
        var minCol = 0;

        if (row % 3 == 0) {
            minRow = row - 3;
            maxRow = row - 1;
        } else {
            var tempMaxRow = row;
            var tempMinRow = row;
            while (tempMaxRow % 3 != 0) {
                tempMaxRow = tempMaxRow + 1;
            }
            while ((tempMinRow) % 3 != 0) {
                tempMinRow = tempMinRow - 1;
            }
            maxRow = tempMaxRow - 1;
            minRow = tempMinRow;
        }
        if (col % 3 == 0) {
            minCol = col - 3;
            maxCol = col - 1;
        } else {
            var tempMaxCol = col;
            var tempMinCol = col;
            while (tempMaxCol % 3 != 0) {
                tempMaxCol = tempMaxCol + 1;
            }
            while ((tempMinCol) % 3 != 0) {
                tempMinCol = tempMinCol - 1;
            }
            maxCol = tempMaxCol - 1;
            minCol = tempMinCol;
        }
        for (var i = minRow; i < puzzle.length; i++) {
            for (var j = minCol; j < puzzle[i].length; j++) {
                if (i <= maxRow && j <= maxCol) {
                    grid.push(puzzle[i][j]);
                }
                if (grid.length == 9) {
                    return grid;
                }
            }
        }
    }
}

module.exports = PuzzleService;
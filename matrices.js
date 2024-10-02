/*
Name        : Matrices
Description : Provides static methods for various matrix operations, including creating matrices, multiplying matrices, checking matrix multiplicity, and printing matrices to the console. This utility class simplifies operations with matrices and offers essential mathematical functions for linear algebra tasks.
*/
class Matrices {
    constructor() { }

    /*
    Method name  : createMatrix
    Description  : Creates a matrix with specified rows and columns, initializes all values to 0.
    Parameters   : matrix , rows , columns 
    Return value : matrix  - the initialized matrix
    */
    static createMatrix(matrix, rows, columns) {
        // Set all elements to 0
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = 0;
            }
        }

        return matrix;
    }

    /*
    Method name  : matrixMultiply
    Description  : Multiplies two matrices and returns the resultant matrix.
    Parameters   : matrix1 , matrix2 
    Return value : resultantMatrix  - the result of the multiplication
    */
    static matrixMultiply(matrix1, matrix2) {
        // Set rows and columns
        let rows = Object.keys(matrix1).length;
        let columns = matrix2[0].length;

        // Initialize and create the resultant matrix
        let resultantMatrix = [];
        resultantMatrix = this.createMatrix(resultantMatrix, rows, columns);

        // Multiply matrix1 and matrix2
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1[0].length; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                resultantMatrix[i][j] = sum;
            }
        }

        return resultantMatrix;
    }
    /*
    Method name  : checkMultiplicity
    Description  : Checks whether two matrices can be multiplied.
    Parameters   : matrix1 , matrix2 
    Return value : Boolean - true if matrices can be multiplied, false otherwise
    */
    static checkMultiplicity(matrix1, matrix2) {

        let matrix1Columns = matrix1[0].length;
        let matrix2Rows = Object.keys(matrix2).length;

        // Check if rows of matrix2 is equal to the columns of matrix1 
        if (matrix2Rows != matrix1Columns) {
            console.log("ERROR: Cannot multiply these two matrices");
            console.log("");
            return false;
        }

        return true;
    }

    /*
    Method name  : printMatrix
    Description  : Prints a matrix to the console.
    Parameters   : matrix 
    Return value : None
    */
    static printMatrix(matrix) {
        for (let i = 0; i < Object.keys(matrix).length; i++) {
            console.log(..."|" + matrix[i] + "|"); // Spread operator
        }
    }

}
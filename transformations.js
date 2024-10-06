/*
Class name   : Transformations
Description  : Provides static methods to perform geometric transformations such as rotation, translation, and scaling on vertices
*/
class Transformations {
    constructor() {}

    /*
    Method name  : rotateVertices
    Description  : Rotates vertices in a vertex array by a given angle around a pivot point
    Parameters   : angle - The angle in degrees to rotate the vertices
                   vertexArray - Array of vertex points to be rotated
                   isPivotToggled - Boolean to determine if pivot mode is enabled
    Return value : None
    */
    static rotateVertices(angle, vertexArray, isPivotToggled) {
        if (isPivotToggled) {
            return 0;
        }

        let radian = (PI / 180) * angle;

        const rotationMatrix = [
            [cos(radian), -sin(radian)],
            [sin(radian), cos(radian)]
        ];

        for (let i = 0; i < vertexArray.length; i++) {
            let translatedMatrix = this.translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1], vertexArray);
            let resultantMatrix = Matrices.matrixMultiply(rotationMatrix, translatedMatrix);
            resultantMatrix = this.translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0], vertexArray);

            vertexArray[i][0] = resultantMatrix[0][0];
            vertexArray[i][1] = resultantMatrix[1][0];
        }
    }

    /*
    Method name  : translateVertices
    Description  : Translates a vertex or the entire vertex array by given x and y distances
    Parameters   : dx - Translation in x-axis
                   dy - Translation in y-axis
                   x1 - x position of the point to translate
                   y1 - y position of the point to translate
                   vertexArray - Array of vertex points to be translated
                   isPivotToggled - Boolean to determine if pivot mode is enabled
    Return value : resultantMatrix - Translated matrix
    */
    static translateVertices(dx, dy, x1, y1, vertexArray, isPivotToggled) {
        if (isPivotToggled) {
            return 0;
        }

        let pointMatrix = [
            [x1],
            [y1],
            [1]
        ];

        const translationMatrix = [
            [1, 0, dx],
            [0, 1, dy],
            [0, 0, 1]
        ];

        let resultantMatrix = Matrices.matrixMultiply(translationMatrix, pointMatrix);

        x1 = resultantMatrix[0][0];
        y1 = resultantMatrix[1][0];

        for (let i = 0; i < vertexArray.length; i++) {
            vertexArray[i][0] += dx;
            vertexArray[i][1] += dy;
        }

        return resultantMatrix;
    }

    /*
    Method name  : scaleVertices
    Description  : Scales vertices in a vertex array around a pivot point by a given factor
    Parameters   : scaleFactor - The scaling factor to apply to the vertices
                   vertexArray - Array of vertex points to be scaled
    Return value : None
    */
    static scaleVertices(scaleFactor, vertexArray) {
        if(isPivotToggled){
            return 0;
        }

        const scalingMatrix = [
            [scaleFactor, 0, 0],
            [0, scaleFactor, 0],
            [0, 0, 1]
        ];

        for (let i = 0; i < vertexArray.length; i++) {
            let translatedMatrix = this.translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1], vertexArray);
            let resultantMatrix = Matrices.matrixMultiply(scalingMatrix, translatedMatrix);
            resultantMatrix = this.translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0], vertexArray);

            vertexArray[i][0] = resultantMatrix[0][0];
            vertexArray[i][1] = resultantMatrix[1][0];
        }
    }
}

/*
Name        : Shapes
Description : Provides static methods for drawing various shapes and graphical elements on a canvas, such as rectangles, points, lines, and images. 
              This utility class aims to simplify drawing operations in the main program.
*/
class Shapes {
    constructor() {}

    /*
    Method name  : drawRectangle
    Description  : Draws a rectangle with the given parameters, including fill color, stroke color, and positioning mode.
    Parameters   : 
        strokeColor - The color for the border of the rectangle.
        mode - Specifies the rectMode (e.g., CORNER, CENTER).
        weight - The thickness of the rectangle's border.
        param1, param2, param3, param4 - Coordinates and dimensions of the rectangle, depending on the mode.
        fillColor - The fill color for the rectangle.
    Return value : None
    */
    static drawRectangle(strokeColor, mode, weight, param1, param2, param3, param4, fillColor) {
        fill(fillColor);
        stroke(strokeColor);
        strokeWeight(weight);
        rectMode(mode);
        rect(param1, param2, param3, param4);
    }

    /*
    Method name  : drawPoint
    Description  : Draws a point at the specified coordinates with the given color and stroke weight.
    Parameters   : 
        color - The color of the point.
        weight - The thickness of the point.
        x, y - Coordinates of the point.
    Return value : None
    */
    static drawPoint(color, weight, x, y) {
        stroke(color);
        strokeWeight(weight);
        point(x, y);
    }

    /*
    Method name  : drawVertex
    Description  : Adds a vertex to the current shape being drawn, with specified color and stroke weight.
    Parameters   : 
        color - The color of the vertex.
        weight - The thickness of the vertex.
        x, y - Coordinates of the vertex.
    Return value : None
    */
    static drawVertex(color, weight, x, y) {
        stroke(color);
        strokeWeight(weight);
        vertex(x, y);
    }

    /*
    Method name  : drawLine
    Description  : Draws a straight line between two points with the specified color and stroke weight.
    Parameters   : 
        color - The color of the line.
        weight - The thickness of the line.
        x1, y1, x2, y2 - Coordinates of the start and end points of the line.
    Return value : None
    */
    static drawLine(color, weight, x1, y1, x2, y2) {
        stroke(color);
        strokeWeight(weight);
        line(x1, y1, x2, y2);
    }

    /*
    Method name  : drawImage
    Description  : Draws an image on the canvas with the specified mode and coordinates.
    Parameters   : 
        myImage - The image to be drawn.
        mode - Specifies the imageMode (e.g., CORNER, CENTER).
        param1, param2, param3, param4 - Coordinates and dimensions to place the image.
    Return value : None
    */
    static drawImage(myImage, mode, param1, param2, param3, param4) {
        imageMode(mode);
        image(myImage, param1, param2, param3, param4);
    }

    /*
    Method name  : drawText
    Description  : Draws text on the canvas with specified alignment, color, and positioning.
    Parameters   : 
        horizAlign - Horizontal alignment of the text (e.g., LEFT, CENTER, RIGHT).
        vertAlign - Vertical alignment of the text (e.g., TOP, CENTER, BOTTOM).
        label - The text to be displayed.
        weight - Stroke weight for the text.
        fillColor - Fill color for the text.
        param1, param2 - Coordinates of the text.
    Return value : None
    */
    static drawText(horizAlign, vertAlign, label, weight, fillColor, param1, param2) {
        fill(fillColor);
        strokeWeight(weight);
        textAlign(horizAlign, vertAlign);
        text(label, param1, param2);
    }
}
/*
Filename    : sketch.js
Author      : Abraham Vijai
Date        : 2024-09-
Description : This is the sketch.js function
*/

// Define constants
const TOOLBAR_WIDTH = 150;
const TRANSLATE_FACTOR = 10;
const SCALE_UP_FACTOR = 1.05;
const SCALE_DOWN_FACTOR = 0.95;
const ROTATE_FACTOR = 45;

// Define global variables
let pivotX = (window.innerWidth + TOOLBAR_WIDTH) / 2;
let pivotY = window.innerHeight / 2;
let isPivotToggled = false;

// Array to store images
let imageList = [];

// Array to store vertices
let vertexArray = []

// Array to store buttons
let buttons = [];

/*
Method name  : setup
Description  : Sets up the canvas, initializes buttons, actions, and labels
Parameters   : None
Return value : None
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Array of all button actions
    const actions = [
        () => rotateVertices(ROTATE_FACTOR),
        () => rotateVertices(-ROTATE_FACTOR),
        () => translateVertices(-TRANSLATE_FACTOR, 0, 0, 0),
        () => translateVertices(TRANSLATE_FACTOR, 0, 0, 0),
        () => translateVertices(0, -TRANSLATE_FACTOR, 0, 0),
        () => translateVertices(0, TRANSLATE_FACTOR, 0, 0),
        () => scaleVertices(SCALE_UP_FACTOR),
        () => scaleVertices(SCALE_DOWN_FACTOR),
        clearCanvas,
        togglePivotMode
    ];

    // Array of all button labels
    const labels = [
        'Rotate CW',
        'Rotate CCW',
        'Move Left',
        'Move Right',
        'Move Up',
        'Move Down',
        'Scale Up',
        'Scale Down',
        'Clear',
        'Toggle Pivot'
    ];

    // Insert all the buttons into the button array
    for (let i = 0; i < 10; i++) {
        buttons.push(new Button(TOOLBAR_WIDTH / 2, i * 70 + 30, 30, 30, labels[i], actions[i], i, isPivotToggled));
    }
}

/*
Method name  : draw
Description  : Draws the toolbar, buttons, shapes, and points on the canvas
Parameters   : None
Return value : None
*/
function draw() {
    background(150);

    // Create Toolbar
    noStroke();
    Shapes.drawRectangle('', CORNER, 0, 0, 0, TOOLBAR_WIDTH, windowHeight, 'red');

    // Create Border
    Shapes.drawLine('black', 10, TOOLBAR_WIDTH, 0, TOOLBAR_WIDTH, windowHeight);

    // Draw all buttons
    buttons.forEach(button => button.draw());

    // Draw the shape
    beginShape();
    for (let i = 0; i < vertexArray.length; i++) {
        let v = vertexArray[i];
        Shapes.drawVertex('blue', 3, v[0], v[1]);
    }
    endShape(CLOSE);

    // Draw the points on top of the lines
    for (let i = 0; i < vertexArray.length; i++) {
        let v = vertexArray[i];
        Shapes.drawPoint("red", 6, v[0], v[1]);
    }

    // Pivot point
    Shapes.drawPoint("green", 6, pivotX, pivotY);
}

/*
Method name  : preload
Description  : Loads images into the imageList array before setup() is called
Parameters   : None
Return value : None
*/
function preload() {
    imageList[0] = loadImage("assets/cw45.png");
    imageList[1] = loadImage("assets/ccw45.png");
    imageList[2] = loadImage("assets/arrowLeft.png");
    imageList[3] = loadImage("assets/arrowRight.png");
    imageList[4] = loadImage("assets/arrowUp.png");
    imageList[5] = loadImage("assets/arrowDown.png");
    imageList[6] = loadImage("assets/larger.png");
    imageList[7] = loadImage("assets/smaller.png");
    imageList[8] = loadImage("assets/clear.png");
    imageList[9] = loadImage("assets/pivot.png");
}

/*
Method name  : mousePressed
Description  : Handles mouse click events, sets pivot or adds vertices based on the current mode
Parameters   : None
Return value : None
*/
function mousePressed() {
    // Check if a button is clicked
    buttons.forEach(button => button.clicked(mouseX, mouseY));

    // if pivot mode is toggled, set the pivot mode
    if (isPivotToggled) {
        if (mouseX > TOOLBAR_WIDTH && mouseX < windowWidth) {
            pivotX = mouseX;
            pivotY = mouseY;
        }
    }
    // If not, set the vertices
    else {
        if (mouseX > TOOLBAR_WIDTH && mouseX < windowWidth) {
            // Push the vertex into the vertex array
            vertexArray.push([mouseX, mouseY]);
        }
    }
}

/*
Method name  : rotateVertices
Description  : Rotates the vertices of the shape by a given angle around the pivot point
Parameters   : angle - The angle in degrees to rotate the shape
Return value : None
*/
function rotateVertices(angle) {
    if (isPivotToggled) {
        return 0;
    }

    let radian = (PI / 180) * angle;

    const rotationMatrix = [
        [cos(radian), -sin(radian)],
        [sin(radian), cos(radian)]
    ];

    for (let i = 0; i < vertexArray.length; i++) {
        let translatedMatrix = translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1]);
        let resultantMatrix = Matrices.matrixMultiply(rotationMatrix, translatedMatrix);
        resultantMatrix = translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0]);

        vertexArray[i][0] = resultantMatrix[0][0];
        vertexArray[i][1] = resultantMatrix[1][0];
    }
}

/*
Method name  : translateVertices
Description  : Translates the vertices by given x and y distances
Parameters   : dx - Translation in x-axis, dy - Translation in y-axis
               x1 - x position, y1 - y position of point to translate
Return value : resultantMatrix - Translated matrix
*/
function translateVertices(dx, dy, x1, y1) {
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
Description  : Scales the vertices of the shape around the pivot point by a given factor
Parameters   : factor - The scaling factor to apply to the shape
Return value : None
*/
function scaleVertices(factor) {
    console.log("scaleVertices called");

    const scalingMatrix = [
        [factor, 0, 0],
        [0, factor, 0],
        [0, 0, 1]
    ];

    for (let i = 0; i < vertexArray.length; i++) {
        let translatedMatrix = translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1]);
        let resultantMatrix = Matrices.matrixMultiply(scalingMatrix, translatedMatrix);
        resultantMatrix = translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0]);

        vertexArray[i][0] = resultantMatrix[0][0];
        vertexArray[i][1] = resultantMatrix[1][0];
    }
}

/*
Method name  : clearCanvas
Description  : Clears the canvas by removing all vertices and resetting the pivot point
Parameters   : None
Return value : None
*/
function clearCanvas() {
    vertexArray = [];
    pivotX = windowWidth / 2;
    pivotY = windowHeight / 2;
    background(150);
}

/*
Method name  : togglePivotMode
Description  : Toggles pivot mode on and off, allowing the user to set the pivot point
Parameters   : None
Return value : None
*/
function togglePivotMode() {
    isPivotToggled = !isPivotToggled;
}

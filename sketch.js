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
const DEFAULT_X = (window.innerWidth + TOOLBAR_WIDTH) / 2
const DEFAULT_Y = window.innerHeight / 2
const TOOLBAR_COLOR = '#2a2a29';
const BORDER_COLOR = '#0c7ad5';
const BACKGROUND_COLOR = 255;

// Define global variables
let pivotX = DEFAULT_X;
let pivotY = DEFAULT_Y;
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
    () => Transformations.rotateVertices(ROTATE_FACTOR, vertexArray, isPivotToggled),
    () => Transformations.rotateVertices(-ROTATE_FACTOR, vertexArray, isPivotToggled),
    () => Transformations.translateVertices(-TRANSLATE_FACTOR, 0, 0, 0, vertexArray, isPivotToggled),
    () => Transformations.translateVertices(TRANSLATE_FACTOR, 0, 0, 0, vertexArray, isPivotToggled),
    () => Transformations.translateVertices(0, -TRANSLATE_FACTOR, 0, 0, vertexArray, isPivotToggled),
    () => Transformations.translateVertices(0, TRANSLATE_FACTOR, 0, 0, vertexArray, isPivotToggled),
    () => Transformations.scaleVertices(SCALE_UP_FACTOR, vertexArray),
    () => Transformations.scaleVertices(SCALE_DOWN_FACTOR, vertexArray),
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
    buttons.push(new Button(TOOLBAR_WIDTH / 2, i * 70 + 30, 40, 40, labels[i], actions[i], i, isPivotToggled));
  }
}

/*
Method name  : draw
Description  : Draws the toolbar, buttons, shapes, and points on the canvas
Parameters   : None
Return value : None
*/
function draw() {
  background(BACKGROUND_COLOR);

  // Create Toolbar
  noStroke();
  Shapes.drawRectangle('', CORNER, 0, 0, 0, TOOLBAR_WIDTH, windowHeight, TOOLBAR_COLOR);

  // Create Border
  Shapes.drawLine(BORDER_COLOR, 10, TOOLBAR_WIDTH, 0, TOOLBAR_WIDTH, windowHeight);

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
Method name  : clearCanvas
Description  : Clears the canvas by removing all vertices and resetting the pivot point
Parameters   : None
Return value : None
*/
function clearCanvas() {
  // Clear the vertex array
  vertexArray = [];
  
  // Set the pivot point to default position
  pivotX = DEFAULT_X
  pivotY = DEFAULT_Y
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

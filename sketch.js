// Define constants
const TOOLBAR_WIDTH = 150;
const TRANSLATE_FACTOR = 10;
const SCALE_UP_FACTOR = 1.05;
const SCALE_DOWN_FACTOR = 0.95;
const ROTATE_FACTOR = 45;

// Define global variables
let currX = 500;
let currY = 300;
let pivotX = 500;
let pivotY = 500;

// Array to store images
var imageList = []; 

// Array to store buttons
let buttons = [];

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

// Array of all button actions
const actions = [
  () => rotateVertices(ROTATE_FACTOR),
  () => rotateVertices(-ROTATE_FACTOR),
  () => translateVertices(-TRANSLATE_FACTOR, 0, currX, currY),
  () => translateVertices(TRANSLATE_FACTOR, 0, currX, currY),
  () => translateVertices(0, -TRANSLATE_FACTOR, currX, currY),
  () => translateVertices(0, TRANSLATE_FACTOR, currX, currY),
  () => scaleVertices(SCALE_UP_FACTOR),
  () => scaleVertices(SCALE_DOWN_FACTOR),
  clearCanvas,
  togglePivotMode
];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Insert all the buttons into the button array
  for (let i = 0; i < 10; i++) {
    buttons.push(new Button(TOOLBAR_WIDTH/2, i*70+30, 30, 30, labels[i], actions[i], i));
  }
  
}

function draw() {

  background(150);

  // Create Toolbar
  noStroke();
  fill('red');
  rectMode(CORNER);
  rect(0, 0, TOOLBAR_WIDTH, windowHeight);
  
  // Create Border
  stroke('black')
  strokeWeight(10)
  line(TOOLBAR_WIDTH, 0, TOOLBAR_WIDTH, windowHeight)

  // Draw all buttons
  buttons.forEach(button => button.draw());

  // Define a point in the canvas area
  strokeWeight(30);
  stroke('blue');
  point(currX, currY);

  // Test pivot point
  strokeWeight(10);
  stroke('green');
  point(pivotX, pivotY);
}

function preload() {
  imageList[0] = loadImage("assets/cw45.png")
  imageList[1] = loadImage("assets/ccw45.png")
  imageList[2] = loadImage("assets/arrowLeft.png")
  imageList[3] = loadImage("assets/arrowRight.png")
  imageList[4] = loadImage("assets/arrowUp.png")
  imageList[5] = loadImage("assets/arrowDown.png")
  imageList[6] = loadImage("assets/larger.png")
  imageList[7] = loadImage("assets/smaller.png")
  imageList[8] = loadImage("assets/clear.png")
  imageList[9] = loadImage("assets/pivot.png")

  // ? maybe rewrite it to cycle throught the folder
}

function mousePressed() {
  // Check if a button is clicked
  buttons.forEach(button => button.clicked(mouseX, mouseY));

  if (mouseX > TOOLBAR_WIDTH && mouseX < windowWidth) {
    currX = mouseX;
    currY = mouseY;
  }
}

// Function implementations for button actions
function rotateVertices(angle) {
  let radian = (PI/180)*angle
  // Move pivot to origin
  let translatedMatrix = translateVertices(-pivotX, -pivotY, currX, currY);

  // Define the rotation matrix
  const rotationMatrix = [
    [cos(radian), -sin(radian)],
    [sin(radian), cos(radian)]
  ];

  // Multiply translated matrix with rotation matrix
  let resultantMatrix = Matrices.matrixMultiply(rotationMatrix, translatedMatrix);

  // Move back from origin to pivot
  let finalMatrix = translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0]);

  // Store the new points in the resultant matrix
  currX = finalMatrix[0][0];
  currY = finalMatrix[1][0];
}

function translateVertices(dx, dy, x1, y1) {
  // Define the translation matrix
  const translationMatrix = [
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1]
  ];
  
  // Create the matrix to store the point
  let pointMatrix = [
    [x1],
    [y1],
    [1]
  ];

  // Multiply point by the translation matrix
  let resultantMatrix = Matrices.matrixMultiply(translationMatrix, pointMatrix);
  
  currX = resultantMatrix[0][0];
  currY = resultantMatrix[1][0];

  return resultantMatrix; // Return the translated matrix
}


function scaleVertices(factor) {
  console.log("scaleVertices called");
  console.log(factor);

}

function clearCanvas() {
  console.log("clearCanvas called");

}


function togglePivotMode() {
  console.log("togglePivotMode called");

}

function mouseClicked() {

}
// Define constants
const TOOLBAR_WIDTH = 150;
const TRANSLATE_FACTOR = 10;
const SCALE_UP_FACTOR = 1.05;
const SCALE_DOWN_FACTOR = 0.95;
const ROTATE_FACTOR = 45;

// Define global variables
let pivotX = (window.innerWidth+TOOLBAR_WIDTH)/2;
let pivotY = window.innerHeight/2;
let isPivotToggled = false;

// Array to store images
let imageList = [];

// Array to store vertices
let vertexArray = []

// Array to store buttons
let buttons = [];

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

function draw() {
  background(150);

  // Create Toolbar
  noStroke();
  Shapes.drawRectangle('', CORNER, 0, 0, 0, TOOLBAR_WIDTH, windowHeight, 'red')

  // Create Border
  Shapes.drawLine('black', 10, TOOLBAR_WIDTH, 0, TOOLBAR_WIDTH, windowHeight)

  // Draw all buttons
  buttons.forEach(button => button.draw());

  // Draw the shape
  beginShape();
  for (let i = 0; i < vertexArray.length; i++) {
    let v = vertexArray[i];

    // Draw the points
    Shapes.drawPoint("red", 6, v[0], v[1])

    // Draw the line
    Shapes.drawVertex('blue', 3, v[0],v[1]);
  }
  endShape(CLOSE)

  // Pivot point
  Shapes.drawPoint("green", 6, pivotX, pivotY)
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
}

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
  // If not set the vertices
  else {
    if (mouseX > TOOLBAR_WIDTH && mouseX < windowWidth) {
      // Push the vertex into the vertex array
      vertexArray.push([mouseX, mouseY]);
    }
  }

}

function rotateVertices(angle) {
  // Check if pivot mode is on
  if (isPivotToggled) {
    return 0;
  }

  // Convert to radians
  let radian = (PI / 180) * angle

  // Define the rotation matrix
  const rotationMatrix = [
    [cos(radian), -sin(radian)],
    [sin(radian), cos(radian)]
  ];

  // Rotate each vertex in the array
  for (let i = 0; i < vertexArray.length; i++) {
    // Move the system to origin
    let translatedMatrix = translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1]);

    // Multiply translated matrix with rotation matrix
    let resultantMatrix = Matrices.matrixMultiply(rotationMatrix, translatedMatrix);

    // Move back from origin to pivot
    resultantMatrix = translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0]);

    // Store the new points in the resultant matrix
    vertexArray[i][0] = resultantMatrix[0][0];
    vertexArray[i][1] = resultantMatrix[1][0];
  }
}

function translateVertices(dx, dy, x1, y1) {
  // Check if pivot mode is on
  if (isPivotToggled) {
    return 0;
  }

  // Define the matrix to be translated
  let pointMatrix = [
    [x1],
    [y1],
    [1]
  ];
  // Define the translation matrix
  const translationMatrix = [
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1]
  ];

  // Multiply point by the translation matrix
  let resultantMatrix = Matrices.matrixMultiply(translationMatrix, pointMatrix);

  x1 = resultantMatrix[0][0];
  y1 = resultantMatrix[1][0];

  // Rotate each vertex in the array
  for (let i = 0; i < vertexArray.length; i++) {
    vertexArray[i][0] += dx;
    vertexArray[i][1] += dy;
  }

  return resultantMatrix; // Return the translated matrix
}

function scaleVertices(factor) {
  console.log("scaleVertices called");

  console.log(factor);
  const scalingMatrix = [
    [factor, 0, 0],
    [0, factor, 0],
    [0, 0, 1]
  ];

  for (let i = 0; i < vertexArray.length; i++) {
    // Move the system to origin
    let translatedMatrix = translateVertices(-pivotX, -pivotY, vertexArray[i][0], vertexArray[i][1]);

    // Multiply translated matrix with rotation matrix
    let resultantMatrix = Matrices.matrixMultiply(scalingMatrix, translatedMatrix);

    // Move back from origin to pivot
    resultantMatrix = translateVertices(pivotX, pivotY, resultantMatrix[0][0], resultantMatrix[1][0]);

    // Store the new points in the resultant matrix
    vertexArray[i][0] = resultantMatrix[0][0];
    vertexArray[i][1] = resultantMatrix[1][0]
  }

}

function clearCanvas() {
  // Clear the vertex array
  vertexArray = [];

  // Reset the pivot point
  pivotX = windowWidth / 2;
  pivotY = windowHeight / 2;

  // Redraw the background 
  background(150);
}

function togglePivotMode() {
  if (isPivotToggled) {
    isPivotToggled = false;
  }
  else {
    isPivotToggled = true;
  }
}

const TOOLBAR_WIDTH = 150

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
  rotateCW,
  rotateCCW,
  () => translateVertices(-10, 0),
  () => translateVertices(10, 0),
  () => translateVertices(0, -10),
  () => translateVertices(0, 10),
  () => scaleVertices(1.05),
  () => scaleVertices(0.95),
  clearCanvas,
  togglePivotMode
];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Insert all the buttons into the button array
  for (let i = 0; i < 10; i++) {
    buttons.push(new Button(TOOLBAR_WIDTH/2, i*70+30, 30, 30, labels[i], actions[i]));
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

  // Load Images
  imageMode(CENTER)
  noFill();
  for (let i = 0; i < 10; i++) {
    image(imageList[i],TOOLBAR_WIDTH/2, i*70+30, 30, 30);
  }
  
  // Draw all buttons
  buttons.forEach(button => button.draw());
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
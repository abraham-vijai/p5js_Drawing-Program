const TOOLBAR_WIDTH = 150
var imageList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(150);
  // Create Toolbar Area
  noStroke();
  fill('red');
  rectMode(CORNER);
  rect(0, 0, TOOLBAR_WIDTH, windowHeight);
  
  // Create Border
  stroke('black')
  strokeWeight(10)
  line(TOOLBAR_WIDTH, 0, TOOLBAR_WIDTH, windowHeight)

  // Load Images
  imageMode(CORNER)
  for (let i = 0; i < 10; i++) {
    image(imageList[i],50, 10+i*60, 50, 50);
  }
}

function preload() {
  imageList[0] = loadImage("assets/clear.png")
  imageList[1] = loadImage("assets/arrowUp.png")
  imageList[2] = loadImage("assets/arrowDown.png")
  imageList[3] = loadImage("assets/arrowRight.png")
  imageList[4] = loadImage("assets/arrowLeft.png")
  imageList[5] = loadImage("assets/ccw45.png")
  imageList[6] = loadImage("assets/cw45.png")
  imageList[7] = loadImage("assets/pivot.png")
  imageList[8] = loadImage("assets/smaller.png")
  imageList[9] = loadImage("assets/larger.png")
}
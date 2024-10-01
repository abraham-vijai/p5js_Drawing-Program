function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Create Toolbar Area
  noStroke();
  fill('red');
  rectMode(CORNER);
  rect(0, 0, 150, windowHeight);
  
  // Create Border
  stroke('black')
  strokeWeight(10)
  line(150, 0, 150, windowHeight)
}

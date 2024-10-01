class Button {
  // Static image list shared among all instances
  static imageList = [];

  /*
  Method name  : constructor
  Description  : Initializes a button with given properties
  Parameters   : x (Number) - x position, y (Number) - y position
                 width (Number) - width of button, height (Number) - height of button
                 label (String) - label on button, action (Function) - action performed on click
  Return value : None
  */
  constructor(x, y, width, height, label, action, imageIndex) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.action = action;
    this.imageIndex = imageIndex; // Index of the image in the image list
  }

  /*
  Method name  : draw
  Description  : Draws the button on the canvas
  Parameters   : None
  Return value : None
  */
  draw() {
    // Draw the border
    strokeWeight(3);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    // Draw the label
    fill(0);
    strokeWeight(0.1);
    textAlign(CENTER, CENTER);
    text(this.label, this.x, this.y + this.height / 2 + 10);
    noFill();

    // Draw the image
    imageMode(CENTER);
    image(imageList[this.imageIndex],TOOLBAR_WIDTH/2, this.imageIndex*70+30, 30, 30);

  }

  /*
  Method name  : clicked
  Description  : Checks if the button is clicked and calls the action
  Parameters   : mouseX (Number) - x position of mouse click, mouseY (Number) - y position of mouse click
  Return value : None
  */
  clicked(mouseX, mouseY) {
    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
      this.action();
    }
  }

  /*
  Method name  : static preload
  Description  : Loads images for buttons before drawing
  Parameters   : None
  Return value : None
  */
  static preload() {
    Button.imageList[0] = loadImage("assets/cw45.png");
    Button.imageList[1] = loadImage("assets/ccw45.png");
    Button.imageList[2] = loadImage("assets/arrowLeft.png");
    Button.imageList[3] = loadImage("assets/arrowRight.png");
    Button.imageList[4] = loadImage("assets/arrowUp.png");
    Button.imageList[5] = loadImage("assets/arrowDown.png");
    Button.imageList[6] = loadImage("assets/larger.png");
    Button.imageList[7] = loadImage("assets/smaller.png");
    Button.imageList[8] = loadImage("assets/clear.png");
    Button.imageList[9] = loadImage("assets/pivot.png");

  }
}

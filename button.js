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
    if(this.imageIndex == 9 && isPivotToggled) {
        fill('white');
    }
    strokeWeight(3);
    stroke('black')
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
    if (mouseX > this.x-(this.height/2) && mouseX < this.x-(this.height/2) + this.width && 
        mouseY > this.y-(this.height/2) && mouseY < this.y-(this.height/2)+this.height) {
      this.action();
    }
  }
}
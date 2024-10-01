class Button {
    /*
    Method name  : constructor
    Description  : Initializes a button with given properties
    Parameters   : x (Number) - x position, y (Number) - y position
                   width (Number) - width of button, height (Number) - height of button
                   label (String) - label on button, action (Function) - action performed on click
    Return value : None
    */
    constructor(x, y, width, height, label, action) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.label = label;
      this.action = action;
    }
  
    /*
    Method name  : draw
    Description  : Draws the button on the canvas
    Parameters   : None
    Return value : None
    */
    draw() {
        strokeWeight(3)
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        strokeWeight(.1);
        textAlign(CENTER, CENTER);
        text(this.label, this.x, this.y+this.height/2+10);
        noFill();
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
  }
    
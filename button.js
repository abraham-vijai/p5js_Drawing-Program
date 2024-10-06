/*
Name        : Button
Description : Represents a button that can be drawn on the canvas and interacted with through mouse clicks. 
              Each button can display an image, have a label, and trigger an action when clicked.
*/
class Button {
  
  // Static image list shared among all instances
  static imageList = [];
  /*
  Method name  : constructor
  Description  : Initializes a button with given properties
  Parameters   : x - x position, y - y position
                  width - width of button, height - height of button
                  label - label on button, action - action performed on click
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
    const BUTTON_FILL_COLOR =  '#878787';
    const BUTTON_BORDER_COLOR = '#dcf900';
    const TEXT_COLOR = 'white'
    const TOGGLE_COLOR = '#00ff26';

    // Draw the border
    if (this.imageIndex == 9 && isPivotToggled) {
    Shapes.drawRectangle(TOGGLE_COLOR, CENTER, 5, this.x, this.y, this.width, this.height, BUTTON_FILL_COLOR)
    }

    else {
    Shapes.drawRectangle(BUTTON_BORDER_COLOR, CENTER, 5, this.x, this.y, this.width, this.height, BUTTON_FILL_COLOR)
    }
    // Draw the label
    Shapes.drawText(CENTER, CENTER, this.label, 0.1, TEXT_COLOR, this.x, this.y + this.height / 2 + 10,)

    // Draw the image
    Shapes.drawImage(imageList[this.imageIndex], CENTER, TOOLBAR_WIDTH / 2, this.imageIndex * 70 + 30, 40, 40)
  }

  /*
  Method name  : clicked
  Description  : Checks if the button is clicked and calls the action
  Parameters   : mouseX - x position of mouse click, mouseY - y position of mouse click
  Return value : None
  */
  clicked(mouseX, mouseY) {
      if (mouseX > this.x - (this.height / 2) && mouseX < this.x - (this.height / 2) + this.width &&
          mouseY > this.y - (this.height / 2) && mouseY < this.y - (this.height / 2) + this.height) {
          this.action();
      }
  }
}
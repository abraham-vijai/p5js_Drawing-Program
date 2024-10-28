Simple Drawing Program
======================

A straightforward and interactive drawing application using p5.js. This tool allows users to create polygons by placing vertices, set a pivot point for the shape, and perform fundamental transformations (rotate, move, and scale) on the drawn shapes.

Features
--------

*   **Full-Screen Canvas**: Fills the entire browser window, providing a large drawing area.
*   **Custom Toolbar**: Located on the left, with user-friendly icons for easy transformations and controls.
*   **Interactive Drawing Board**: Supports vertex placement to create polygons, and toggling between vertex or pivot placement mode.
*   **Transformations**:
    *   Rotate (Clockwise and Counterclockwise)
    *   Move (Left, Right, Up, Down)
    *   Scale (Increase or Decrease size)
*   **Clear Canvas**: Removes all vertices and resets the pivot to the center of the drawing area.

Getting Started
---------------

### Prerequisites

*   p5.js library for drawing and interaction.

### Installation

1.  Clone the repository:
    
    ```bash
    git clone https://github.com/your-username/repository-name.git
    ```
    
2.  Open the project folder:
    
    ```bash
    cd repository-name
    ```
    
3.  Open `index.html` in your browser to launch the application.
    

Usage
-----

1.  **Drawing**:
    
    *   Click on the drawing area to add vertices for your shape.
    *   Toggle between vertex and pivot placement mode to set the desired pivot point.
2.  **Transformation Controls**:
    
    *   Use the toolbar buttons to rotate, move, or scale the shape around the pivot point.
    *   Each transformation is applied relative to the current pivot point.
3.  **Reset Canvas**:
    
    *   Use the "Clear" button to erase all vertices and reset the pivot to the center of the drawing area.

Implementation
--------------

The application uses basic matrix transformations for translating, rotating, and scaling the shape around the pivot point. Transformation functions are implemented from scratch, without relying on p5.js’s built-in functions, for a deeper understanding of matrix operations.

Customizations
--------------

*   The button layout and styling can be adjusted within the toolbar area for an improved user experience.
*   Icon images are from [Kenney's Game Icons](https://kenney.nl/assets/game-icons) but can be replaced or customized as needed.

License
-------

This project is open-source and available under the MIT License.

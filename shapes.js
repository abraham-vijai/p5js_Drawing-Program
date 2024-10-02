class Shapes {
    constructor() {

    }

    static drawRectangle(strokeColor, mode, weight, p1, p2, p3, p4, fillColor) {
        fill(fillColor)
        stroke(strokeColor);
        rectMode(mode);
        strokeWeight(weight);
        rect(p1, p2, p3, p4);
    }

    static drawPoint(color, weight, x, y) {
        stroke(color);
        strokeWeight(weight);
        point(x, y);
    }
    
    static drawVertex(color, weight, x, y) {
        stroke(color);
        strokeWeight(weight);
        vertex(x, y);
    }

    static drawLine(color, weight, x1, y1, x2, y2) {
        stroke(color)
        strokeWeight(weight)
        line(x1, y1, x2, y2)
    }

    static drawImage(myImage, mode, p1, p2, p3, p4) {
        imageMode(mode);
        image(myImage, p1, p2, p3, p4);
    }

    static drawText(horizAlign, vertAlign, label, weight, fillColor, p1, p2, p3, p4) {
        fill(fillColor);
        strokeWeight(weight);
        textAlign(horizAlign, vertAlign);
        text(label, p1, p2);
        noFill();
    }
}
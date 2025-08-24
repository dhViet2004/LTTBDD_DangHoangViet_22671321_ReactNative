"use strict";
class Shape {
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
class Square extends Shape {
    constructor(sideLength) {
        super();
        this.sideLength = sideLength;
    }
    area() {
        return this.sideLength * this.sideLength;
    }
}
const shapes = [
    new Circle(5),
    new Square(4)
];
shapes.forEach(shape => {
    console.log(`Area: ${shape.area()}`);
});

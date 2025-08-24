abstract class Shape {
    abstract area(): number;
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Shape {
    constructor(private sideLength: number) {
        super();
    }

    area(): number {
        return this.sideLength * this.sideLength;
    }
}

const shapes: Shape[] = [
    new Circle(5),
    new Square(4)
];

shapes.forEach(shape => {
    console.log(`Area: ${shape.area()}`);
});

interface Movable {
    move(): void;
} 

class Car implements Movable {
    move(): void {
        console.log("Car is moving");
    }
}

class Bicycle implements Movable {
    move(): void {
        console.log("Bicycle is moving");
    }
}

const car = new Car();
car.move();

const bicycle = new Bicycle();
bicycle.move();

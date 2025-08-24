"use strict";
class Car {
    move() {
        console.log("Car is moving");
    }
}
class Bicycle {
    move() {
        console.log("Bicycle is moving");
    }
}
const car = new Car();
car.move();
const bicycle = new Bicycle();
bicycle.move();

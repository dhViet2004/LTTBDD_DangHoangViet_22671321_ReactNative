"use strict";
class Car {
    move() {
        console.log("Car is moving");
    }
}
class Bike {
    move() {
        console.log("Bike is moving");
    }
}
const vehicles = [new Car(), new Bike()];
vehicles.forEach(vehicle => vehicle.move());

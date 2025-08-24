"use strict";
class Bird {
    fly() {
        console.log("The bird is flying.");
    }
}
class Fish {
    swim() {
        console.log("The fish is swimming.");
    }
}
const myBird = new Bird();
const myFish = new Fish();
myBird.fly();
myFish.swim();

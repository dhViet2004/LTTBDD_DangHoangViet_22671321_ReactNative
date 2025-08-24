"use strict";
class Animal {
    makeSound() {
        console.log("Animal makes a sound");
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Dog barks");
    }
}
class Cat extends Animal {
    makeSound() {
        console.log("Cat meows");
    }
}
const animals = [new Dog(), new Cat()];
animals.forEach(animal => animal.makeSound());

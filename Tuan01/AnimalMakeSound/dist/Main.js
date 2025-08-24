"use strict";
class Animal {
    makeSound() {
        console.log("Animal makes sound");
    }
    sound() {
        this.makeSound();
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Woof! Woof!");
    }
}
class Cat extends Animal {
    makeSound() {
        console.log("Meow! Meow!");
    }
}
const dog = new Dog();
dog.sound();
const cat = new Cat();
cat.sound();

class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Dog barks");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Cat meows");
    }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => animal.makeSound());

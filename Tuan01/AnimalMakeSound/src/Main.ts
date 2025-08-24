class Animal{
    protected makeSound(): void {
        console.log("Animal makes sound");
    }
    sound(): void {
        this.makeSound();
    }
}

class Dog extends Animal {
    protected makeSound(): void {
        console.log("Woof! Woof!");
    }
}

class Cat extends Animal {
    protected makeSound(): void {
        console.log("Meow! Meow!");
    }
}

const dog = new Dog();
dog.sound();

const cat = new Cat();
cat.sound();

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("The bird is flying.");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("The fish is swimming.");
  }
}

const myBird = new Bird();
const myFish = new Fish();

myBird.fly();
myFish.swim();

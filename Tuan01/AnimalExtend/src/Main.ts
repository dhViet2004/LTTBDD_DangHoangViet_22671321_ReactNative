import Dog from "./Dog";
import Cat from "./Cat";

const myDog = new Dog("Buddy");
const myCat = new Cat("Whiskers");
console.log(myDog.name);
myDog.bark();

console.log(myCat.name);
myCat.meow();

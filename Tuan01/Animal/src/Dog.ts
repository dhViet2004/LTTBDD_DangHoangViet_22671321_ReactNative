import { Animal } from "./Interface_Animal";

export class Dog implements Animal {
    name: string = "Dog";
    sound(): void {
        console.log("Woof! Woof!");
    }
}

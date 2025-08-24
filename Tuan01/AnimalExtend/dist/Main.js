"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dog_1 = __importDefault(require("./Dog"));
const Cat_1 = __importDefault(require("./Cat"));
const myDog = new Dog_1.default("Buddy");
const myCat = new Cat_1.default("Whiskers");
console.log(myDog.name);
myDog.bark();
console.log(myCat.name);
myCat.meow();

"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        super.introduce();
        console.log(`I teach ${this.subject}.`);
    }
}
const teacher = new Teacher("Hoang Viet", 22, "Mathematics");
teacher.introduce();

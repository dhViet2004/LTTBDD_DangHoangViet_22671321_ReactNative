class Person{
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    introduce(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
class Teacher extends Person {
    subject: string;
    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }
    introduce(): void {
        super.introduce();
        console.log(`I teach ${this.subject}.`);
    }
}

const teacher = new Teacher("Hoang Viet", 22, "Mathematics");
teacher.introduce();


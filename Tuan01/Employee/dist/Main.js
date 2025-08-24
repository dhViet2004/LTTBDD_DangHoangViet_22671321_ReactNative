"use strict";
class Employee {
    constructor(name) {
        this.name = name;
    }
}
class Manager extends Employee {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getDetails() {
        return `${this.name} is a Manager in ${this.department} department.`;
    }
}
class Developer extends Employee {
    constructor(name, programmingLanguage) {
        super(name);
        this.programmingLanguage = programmingLanguage;
    }
    getDetails() {
        return `${this.name} is a Developer proficient in ${this.programmingLanguage}.`;
    }
}
const emp1 = new Manager("Hoang Viet", "HR");
const emp2 = new Developer("My Nhan", "TypeScript");
console.log(emp1.getDetails());
console.log(emp2.getDetails());

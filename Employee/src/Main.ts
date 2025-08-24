class Employee {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Manager extends Employee {
    constructor(name: string, private department: string) {
        super(name);
    }

    getDetails(): string {
        return `${this.name} is a Manager in ${this.department} department.`;
    }
}

class Developer extends Employee {
    constructor(name: string, private programmingLanguage: string) {
        super(name);
    }

    getDetails(): string {
        return `${this.name} is a Developer proficient in ${this.programmingLanguage}.`;
    }
}

const emp1 = new Manager("Hoang Viet", "HR");
const emp2 = new Developer("My Nhan", "TypeScript");


console.log(emp1.getDetails());
console.log(emp2.getDetails());


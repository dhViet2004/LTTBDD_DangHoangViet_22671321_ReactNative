class Student {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public introduce(): void {
        console.log(`Hello, my name is ${this.getName()} and I am ${this.getAge()} years old.`);
    }
}

class Teacher {
    private name: string;
    private subject: string;

    constructor(name: string, subject: string) {
        this.name = name;
        this.subject = subject;
    }

    public getName(): string {
        return this.name;
    }

    public getSubject(): string {
        return this.subject;
    }

    public introduce(): void {
        console.log(`Hello, my name is ${this.getName()} and I teach ${this.getSubject()}.`);
    }
}

class School {
    private name: string;
    private students: Student[];
    private teachers: Teacher[];

    constructor(name: string) {
        this.name = name;
        this.students = [];
        this.teachers = [];
    }

    public getName(): string {
        return this.name;
    }

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    public introduce(): void {
        console.log(`Welcome to ${this.getName()}!`);
        this.students.forEach(student => student.introduce());
        this.teachers.forEach(teacher => teacher.introduce());
    }
}

const student1 = new Student("Hoang Viet", 18);
const student2 = new Student("My Nhan", 19);
const teacher1 = new Teacher("ThS. Nguyen", "Toán");
const teacher2 = new Teacher("ThS. Tran", "English");

const school = new School("THPT Ngyễn Thị Minh Khai");
school.addStudent(student1);
school.addStudent(student2);
school.addTeacher(teacher1);
school.addTeacher(teacher2);

school.introduce();
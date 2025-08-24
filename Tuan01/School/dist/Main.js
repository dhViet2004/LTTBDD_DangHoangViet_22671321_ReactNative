"use strict";
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    introduce() {
        console.log(`Hello, my name is ${this.getName()} and I am ${this.getAge()} years old.`);
    }
}
class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
    }
    getName() {
        return this.name;
    }
    getSubject() {
        return this.subject;
    }
    introduce() {
        console.log(`Hello, my name is ${this.getName()} and I teach ${this.getSubject()}.`);
    }
}
class School {
    constructor(name) {
        this.name = name;
        this.students = [];
        this.teachers = [];
    }
    getName() {
        return this.name;
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    introduce() {
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

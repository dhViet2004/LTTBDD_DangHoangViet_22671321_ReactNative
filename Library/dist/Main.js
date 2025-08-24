"use strict";
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    getDetails() {
        return `${this.title} by ${this.author} (${this.year})`;
    }
}
class User {
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
        this.borrowedBooks = [];
    }
    borrowBook(book) {
        this.borrowedBooks.push(book);
    }
    returnBook(book) {
        this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
    }
    listBorrowedBooks() {
        return this.borrowedBooks.map(book => book.getDetails());
    }
    getDetails() {
        return `${this.name} (ID: ${this.userId})`;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    registerUser(user) {
        this.users.push(user);
    }
    listAvailableBooks() {
        return this.books.map(book => book.getDetails());
    }
    listUsers() {
        return this.users;
    }
}
const lib = new Library();
lib.addBook(new Book("Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1949));
lib.registerUser(new User("Nam", 1));
lib.registerUser(new User("Viet", 2));
lib.listAvailableBooks().forEach(book => console.log(book));
console.log("Danh sách người dùng đã đăng ký:");
lib.listUsers().forEach(user => console.log(user.getDetails()));

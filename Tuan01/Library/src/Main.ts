class Book {
    constructor(private title: string, private author: string, private year: number) {}

    getDetails(): string {
        return `${this.title} by ${this.author} (${this.year})`;
    }
}

class User {
    private borrowedBooks: Book[] = [];

    constructor(private name: string, private userId: number) {}

    borrowBook(book: Book): void {
        this.borrowedBooks.push(book);
    }

    returnBook(book: Book): void {
        this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
    }

    listBorrowedBooks(): string[] {
        return this.borrowedBooks.map(book => book.getDetails());
    }

    getDetails(): string {
        return `${this.name} (ID: ${this.userId})`;
    }
}

class Library {
    private books: Book[] = [];
    private users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    registerUser(user: User): void {
        this.users.push(user);
    }

    listAvailableBooks(): string[] {
        return this.books.map(book => book.getDetails());
    }

    listUsers(): User[] {
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



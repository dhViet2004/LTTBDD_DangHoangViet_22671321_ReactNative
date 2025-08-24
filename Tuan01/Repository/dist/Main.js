"use strict";
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const repo = new Repository();
repo.add("Hello");
repo.add("World");
console.log(repo.getAll());

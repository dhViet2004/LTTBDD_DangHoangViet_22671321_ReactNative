"use strict";
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    showDetails() {
        console.log(`Product Name: ${this.name}, Price: ${this.price}`);
    }
}
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    showOrderDetails() {
        console.log("Order Details:");
        this.products.forEach(product => product.showDetails());
    }
}
const order = new Order();
order.addProduct(new Product("Laptop", 1200));
order.addProduct(new Product("Mouse", 25));
order.showOrderDetails();

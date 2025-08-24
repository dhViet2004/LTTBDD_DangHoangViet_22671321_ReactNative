"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./Product");
const products = [
    new Product_1.Product("Product 1", 100),
    new Product_1.Product("Product 2", 200),
    new Product_1.Product("Product 3", 300)
];
const filtered = products.filter(p => p.price > 100);
console.log(filtered);

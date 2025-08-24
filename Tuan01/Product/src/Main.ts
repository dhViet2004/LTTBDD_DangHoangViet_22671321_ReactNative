import { Product } from "./Product";

const products: Product[] = [
    new Product("Product 1", 100),
    new Product("Product 2", 200),
    new Product("Product 3", 300)
];

const filtered = products.filter(p => p.price > 100);

console.log(filtered);


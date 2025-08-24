class Product {
    name: string;
    price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
    showDetails(): void {
        console.log(`Product Name: ${this.name}, Price: ${this.price}`);
    }
}

class Order {
    products: Product[];
    constructor() {
        this.products = [];
    }
    addProduct(product: Product): void {
        this.products.push(product);
    }
    showOrderDetails(): void {
        console.log("Order Details:");
        this.products.forEach(product => product.showDetails());
    }
}

const order = new Order();
order.addProduct(new Product("Laptop", 1200));
order.addProduct(new Product("Mouse", 25));
order.showOrderDetails();



export class Product{
    name: string;
    price: number;

    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }
    showInfo(): void{
        console.log(`Product Name: ${this.name}, Price: ${this.price}`);
    }
}

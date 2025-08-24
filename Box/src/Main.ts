class Box <T>{
    value: T;
    constructor(value: T) {
        this.value = value;
    }


    getValue(): T {
        return this.value;
    }
}

const box = new Box<number>(123);
console.log(`Box value: ${box.getValue()}`);

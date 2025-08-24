"use strict";
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const box = new Box(123);
console.log(`Box value: ${box.getValue()}`);

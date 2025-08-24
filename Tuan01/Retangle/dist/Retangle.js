"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retangle = void 0;
class Retangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    caculate() {
        const area = this.width * this.height;
        const perimeter = 2 * (this.width + this.height);
        return { area, perimeter };
    }
}
exports.Retangle = Retangle;

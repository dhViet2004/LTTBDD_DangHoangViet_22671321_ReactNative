export class Retangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    caculate(): { area: number; perimeter: number } {
        const area = this.width * this.height;
        const perimeter = 2 * (this.width + this.height);
        return { area, perimeter };
    }
}

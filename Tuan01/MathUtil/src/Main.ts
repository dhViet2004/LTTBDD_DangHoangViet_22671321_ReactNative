class MathUtil {
    static add (a: number, b: number): number {
        return a + b;
    }

    static subtract (a: number, b: number): number {
        return a - b;
    }

    static multiply (a: number, b: number): number {
        return a * b;
    }

    static divide (a: number, b: number): number {
        return a / b;
    }
}

const result1 = MathUtil.add(5, 10);
const result2 = MathUtil.subtract(5, 10);
const result3 = MathUtil.multiply(5, 10);
const result4 = MathUtil.divide(5, 10);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);

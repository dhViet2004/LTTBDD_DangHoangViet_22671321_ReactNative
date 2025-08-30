const number = [1,2,3,4,5,6,7,8,9,10];

function filterEvenNumbersAsync(): Promise<number[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evenNumbers = number.filter(num => num % 2 === 0);
            resolve(evenNumbers);
        }, 1000);
    });
}

async function run() {
    try {
        const evenNumbers = await filterEvenNumbersAsync();
        console.log("Số chẵn là: ", evenNumbers);
    } catch (error) {
        console.log("Đã xảy ra lỗi: ", error);
    } finally {
        console.log("Hoàn thành việc lọc số chẵn.");
        
    }
}

run();

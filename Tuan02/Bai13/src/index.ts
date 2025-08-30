function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed after ${time} ms`);
        }, time);
    });
} 

async function callSimulateTask() {
    try {
        const result = await simulateTask(2000);
        console.log(result);
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

callSimulateTask();
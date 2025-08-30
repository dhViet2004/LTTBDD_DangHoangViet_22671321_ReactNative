async function callSimulateTask() {
    const result = await simulateTask(2000);
    console.log(result);
}

function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed after ${time} ms`);
        }, time);
    });
}

callSimulateTask();

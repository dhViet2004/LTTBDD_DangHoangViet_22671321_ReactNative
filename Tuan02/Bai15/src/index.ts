async function tripleAfterDelay(num: number): Promise<number> {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
}

async function run() {
    const result1 = await tripleAfterDelay(5);
    console.log(result1);
    const result2 = await tripleAfterDelay(10);
    console.log(result2);
    const result3 = await tripleAfterDelay(15);
    console.log(result3);
}

run();
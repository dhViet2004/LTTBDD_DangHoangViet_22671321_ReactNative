async function tripleAfterDelay(num: number): Promise<number> {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
}

async function run() {
    const result = await Promise.all([
        tripleAfterDelay(1),
        tripleAfterDelay(2),
        tripleAfterDelay(3)
    ]);
    console.log(result);
}

run();
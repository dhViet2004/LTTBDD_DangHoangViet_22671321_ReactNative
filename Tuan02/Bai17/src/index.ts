function tripleAfterDelay(num: number): Promise<number> {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);  
    });
}

async function run() {
    const promises = [
        tripleAfterDelay(5),
        tripleAfterDelay(10),
        tripleAfterDelay(15)
    ];
    for await (const result of promises) {
        console.log('Kết quả:', result);
    }
}
run();

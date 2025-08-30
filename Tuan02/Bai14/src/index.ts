async function tripleAfterDelay(num: number): Promise<number> {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
} 

async function run() {
    const result = await tripleAfterDelay(5);
    console.log(result);
}

run();

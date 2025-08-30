function getErrorAsync(): Promise<never> {
    return new Promise((_, reject)=>{
        setTimeout(() => {
            reject(new Error("Something went wrong!"));
        }, 1000);
    })
}

getErrorAsync().catch((error)=>{
    console.error(error.message);
});
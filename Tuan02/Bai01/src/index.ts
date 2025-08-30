 const helloAsyncPromise = new Promise<string>(()=>{
    setTimeout(() => {
        console.log("Hello Async Promise");
    }, 2000);
 })

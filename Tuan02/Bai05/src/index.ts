function sumulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
} 

sumulateTask(1500).then((message)=>{
    console.log(message);
});

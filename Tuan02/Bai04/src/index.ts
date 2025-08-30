const randomNumberPromise = new Promise<number>((resolve, reject)=>{
    const num = Math.random();
    if(num >= 0){
        resolve(num);
    }else{
        reject(new Error("Lỗi không tạo ra số ngẫu nhiên") );
    }
});

randomNumberPromise
    .then((num)=>{
        console.log("Số ngẫu nhiên là: ", num);
    })
    .catch((error)=>{
        console.error("Lỗi: ", error.message);
    });

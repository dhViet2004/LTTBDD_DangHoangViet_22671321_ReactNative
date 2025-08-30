"use strict";
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed after ${time} ms`);
        }, time);
    });
}
Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500)
]).then((results) => {
    console.log('Kết quả của tất cả các tác vụ:', results);
});

"use strict";
const helloAsyncPromise = new Promise(() => {
    setTimeout(() => {
        console.log("Hello Async Promise");
    }, 2000);
});

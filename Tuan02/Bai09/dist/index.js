"use strict";
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filterEvenNumbersPromise = new Promise((resolve) => {
    setTimeout(() => {
        const evenNumbers = number.filter(num => num % 2 === 0);
        resolve(evenNumbers);
    }, 1000);
});
filterEvenNumbersPromise.then((evenNumbers) => {
    console.log("Số chẵn là: ", evenNumbers);
});

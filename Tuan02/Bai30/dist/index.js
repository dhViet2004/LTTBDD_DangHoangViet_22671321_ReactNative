"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/invalid', // lỗi
    'https://jsonplaceholder.typicode.com/todos/3',
];
function fetchApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch: ${url}`);
        return response.json();
    });
}
function handleMultipleApiCalls() {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = urls.map(url => fetchApi(url));
        const results = yield Promise.allSettled(promises);
        results.forEach((result, idx) => {
            if (result.status === 'fulfilled') {
                console.log(`API ${idx + 1} thành công:`, result.value);
            }
            else {
                console.log(`API ${idx + 1} thất bại:`, result.reason);
            }
        });
    });
}
handleMultipleApiCalls();

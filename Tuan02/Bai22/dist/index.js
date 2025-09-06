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
const url = 'https://jsonplaceholder.typicode.com/todos/1';
function callApiMultipleTimes(times) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < times; i++) {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = yield response.json();
                console.log(`Lần gọi thứ ${i + 1}:`, data);
            }
            catch (error) {
                console.error(`Lỗi ở lần gọi thứ ${i + 1}:`, error);
            }
        }
    });
}
callApiMultipleTimes(5);

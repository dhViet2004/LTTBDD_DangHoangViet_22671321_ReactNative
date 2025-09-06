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
function postData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        try {
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = yield response.json();
            console.log('Kết quả POST:', result);
        }
        catch (error) {
            console.error('Lỗi khi gửi POST:', error);
        }
    });
}
// Ví dụ gọi hàm postData
postData({
    title: 'foo',
    body: 'bar',
    userId: 1,
});

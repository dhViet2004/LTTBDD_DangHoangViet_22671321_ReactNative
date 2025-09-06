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
function fetchWithRetry(url, retries) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Network response was not ok (attempt ${attempt})`);
                }
                const data = yield response.json();
                console.log(`Thành công ở lần thử thứ ${attempt}:`, data);
                return data;
            }
            catch (error) {
                console.error(`Lỗi ở lần thử thứ ${attempt}:`, error);
                if (attempt === retries) {
                    throw new Error('Hết số lần thử, không thể lấy dữ liệu.');
                }
            }
        }
    });
}
// Ví dụ gọi hàm
fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
    .then(data => console.log('Kết quả cuối cùng:', data))
    .catch(error => console.error('Thất bại:', error));

async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok (attempt ${attempt})`);
      }
      const data = await response.json();
      console.log(`Thành công ở lần thử thứ ${attempt}:`, data);
      return data;
    } catch (error) {
      console.error(`Lỗi ở lần thử thứ ${attempt}:`, error);
      if (attempt === retries) {
        throw new Error('Hết số lần thử, không thể lấy dữ liệu.');
      }
    }
  }
}

// Ví dụ gọi hàm
fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
  .then(data => console.log('Kết quả cuối cùng:', data))
  .catch(error => console.error('Thất bại:', error));

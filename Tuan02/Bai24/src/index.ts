async function postData(data: object): Promise<void> {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('Kết quả POST:', result);
  } catch (error) {
    console.error('Lỗi khi gửi POST:', error);
  }
}

// Ví dụ gọi hàm postData
postData({
  title: 'foo',
  body: 'bar',
  userId: 1,
});

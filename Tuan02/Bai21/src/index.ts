const url = 'https://jsonplaceholder.typicode.com/todos/1';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dữ liệu từ API:', data);
  })
  .catch(error => {
    console.error('Có lỗi xảy ra:', error);
  });


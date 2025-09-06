interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos/1';

async function callApiMultipleTimes(times: number): Promise<void> {
  for (let i = 0; i < times; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Todo = await response.json();
      console.log(`Lần gọi thứ ${i + 1}:`, data);
    } catch (error) {
      console.error(`Lỗi ở lần gọi thứ ${i + 1}:`, error);
    }
  }
}

callApiMultipleTimes(5);
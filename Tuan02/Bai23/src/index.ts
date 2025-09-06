interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos';

async function fetchCompletedTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const todos: Todo[] = await response.json();
    const completedTodos = todos.filter(todo => todo.completed);
    console.log('Các todo đã hoàn thành:', completedTodos);
    return completedTodos;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách todos:', error);
    return [];
  }
}

fetchCompletedTodos();
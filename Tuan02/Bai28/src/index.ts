async function asyncTask(id: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Task ${id} completed`);
    }, 1000 * id); // mỗi task mất id giây
  });
}

async function batchProcess(): Promise<void> {
  const tasks = [1, 2, 3, 4, 5].map(id => asyncTask(id));
  const results = await Promise.all(tasks);
  console.log('Kết quả xử lý batch:', results);
}

// Ví dụ gọi hàm
batchProcess();

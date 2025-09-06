async function asyncTask(id: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Task ${id} completed`);
    }, 1000 * id);
  });
}

async function queueProcess(): Promise<void> {
  const ids = [1, 2, 3, 4, 5];
  for (const id of ids) {
    const result = await asyncTask(id);
    console.log(result);
  }
  console.log('Đã xử lý xong tất cả các task theo thứ tự.');
}

queueProcess();

// app/lib/api.ts

const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // API giả lập (có thể đổi sang server thật của bạn)

// Gửi danh sách task lên "cloud"
export async function uploadTasks(tasks: any[]) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks),
  });

  if (!res.ok) throw new Error('Lỗi khi gửi dữ liệu lên server');
  return await res.json();
}

// Lấy dữ liệu task từ "cloud" (ví dụ giới hạn 5)
export async function fetchTasksFromCloud() {
  const res = await fetch(`${API_URL}?_limit=5`);
  if (!res.ok) throw new Error('Không thể tải dữ liệu từ cloud');
  return await res.json();
}

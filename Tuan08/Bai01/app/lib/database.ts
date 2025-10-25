import * as SQLite from 'expo-sqlite';

// Mở hoặc tạo database
const db = SQLite.openDatabaseSync('tasks.db');

// Tạo bảng nếu chưa có
export async function initDB() {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      color TEXT
    );
  `);
}

// Lấy tất cả task
export async function getTasks() {
    const result = await db.getAllAsync('SELECT * FROM tasks');
    return result;
}

// Thêm task mới
export async function addTask(title: string, color?: string) {
    await db.runAsync('INSERT INTO tasks (title, color, completed) VALUES (?, ?, 0)', [title, color || null]);
}

// Cập nhật trạng thái completed
export async function toggleTask(id: number, completed: boolean) {
    await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
}


// Xóa task
export async function deleteTask(id: number) {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
}

export default db;

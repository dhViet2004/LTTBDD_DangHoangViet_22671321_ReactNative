import * as SQLite from 'expo-sqlite';
import { uploadTasks, fetchTasksFromCloud } from '../../api';
// Mở hoặc tạo database
const db = SQLite.openDatabaseSync('tasks.db');

// Tạo bảng nếu chưa có
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      color TEXT,
      synced INTEGER DEFAULT 0
    );
  `);
  
  // Kiểm tra và thêm cột synced nếu chưa có (migration)
  try {
    const tableInfo = await db.getAllAsync('PRAGMA table_info(tasks)') as any[];
    const hasSyncedColumn = tableInfo.some(col => col.name === 'synced');
    
    if (!hasSyncedColumn) {
      await db.execAsync('ALTER TABLE tasks ADD COLUMN synced INTEGER DEFAULT 0');
      console.log('✅ Đã thêm cột synced vào bảng tasks');
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra/migrate cột synced:', error);
  }
}


// Lấy tất cả task
export async function getTasks() {
    const result = await db.getAllAsync('SELECT * FROM tasks');
    return result;
}

// Thêm task mới
export async function addTask(title: string, color?: string) {
  await db.runAsync(
    'INSERT INTO tasks (title, color, completed, synced) VALUES (?, ?, 0, 0)',
    [title, color || null]
  );
}


// Cập nhật trạng thái completed
export async function toggleTask(id: number, completed: boolean) {
    await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
}


// Xóa task
export async function deleteTask(id: number) {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
}
export async function syncTasks() {
  // 1. Lấy các task chưa đồng bộ (synced = 0)
  const unsynced = await db.getAllAsync('SELECT * FROM tasks WHERE synced = 0') as any[];

  // 2. Gửi chúng lên server
  if (unsynced.length > 0) {
    try {
      await uploadTasks(unsynced);

      // Cập nhật lại synced = 1
      for (const t of unsynced) {
        await db.runAsync('UPDATE tasks SET synced = 1 WHERE id = ?', [t.id]);
      }
    } catch (err) {
      console.error('❌ Lỗi khi gửi dữ liệu:', err);
    }
  }

  // 3. Lấy task mới nhất từ server
  try {
    const cloudTasks = await fetchTasksFromCloud();

    // 4. Chèn các task cloud (nếu chưa có trong local)
    for (const task of cloudTasks) {
      const existing = await db.getAllAsync('SELECT * FROM tasks WHERE title = ?', [task.title]);
      if (existing.length === 0) {
        await db.runAsync(
          'INSERT INTO tasks (title, completed, color, synced) VALUES (?, ?, ?, 1)',
          [task.title, task.completed ? 1 : 0, null]
        );
      }
    }

    console.log('✅ Đồng bộ hoàn tất');
  } catch (err) {
    console.error('❌ Lỗi khi tải dữ liệu từ cloud:', err);
  }
}
export { db };
export default db;

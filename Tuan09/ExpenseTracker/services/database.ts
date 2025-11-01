import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('expenses.db');

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  isDeleted: number;
};

// Định nghĩa kiểu Filter
export type FilterType = 'all' | 'income' | 'expense';

// Hàm khởi tạo database (đã có)
export const initDB = () => {
  try {
    db.execSync(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL, 
        date TEXT NOT NULL,
        type TEXT NOT NULL,
        isDeleted INTEGER DEFAULT 0
      );`
    );
    try {
      db.execSync('ALTER TABLE expenses ADD COLUMN isDeleted INTEGER DEFAULT 0;');
    } catch (e) { /* Bỏ qua lỗi */ }
  } catch (error) {
    console.error('Lỗi khi khởi tạo DB "expenses":', error);
  }
};

// (Câu 3c) Hàm thêm (đã có)
export const addExpense = (title: string, amount: number, date: string, type: 'income' | 'expense') => {
  try {
    db.runSync(
      'INSERT INTO expenses (title, amount, date, type, isDeleted) VALUES (?, ?, ?, ?, 0);',
      title, amount, date, type
    );
  } catch (error) {
    console.error('Lỗi khi thêm Thu/Chi:', error);
  }
};

// --- (ĐÃ SỬA LỖI CÂU 10) ---
// (Câu 10b) Hàm lấy Thu/Chi (CHƯA XÓA) + TÌM KIẾM + LỌC
export const fetchExpenses = (searchQuery: string = "", filterType: FilterType = 'all'): Expense[] => {
  try {
    // Bắt đầu câu truy vấn
    // (FIX) Đã xóa dấu ; ở cuối
    let query = `SELECT * FROM expenses WHERE isDeleted = 0 AND (title LIKE ?)`;
    const params: any[] = [`%${searchQuery}%`];

    // (Câu 10b) Thêm điều kiện lọc
    if (filterType !== 'all') {
      query += ' AND type = ?'; // Thêm AND type = 'income' (hoặc 'expense')
      params.push(filterType);
    }
    
    // (FIX) Thêm dấu ; vào CUỐI CÙNG
    query += ';';

    const allExpenses = db.getAllSync<Expense>(query, params);
    return allExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi (có lọc):', error);
    return [];
  }
};
// -------------------------

// (Câu 4) Hàm lấy 1 Thu/Chi bằng ID (đã có)
export const fetchExpenseById = (id: number): Expense | null => {
  try {
    const expense = db.getFirstSync<Expense>('SELECT * FROM expenses WHERE id = ?;', id);
    return expense || null;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi bằng ID:', error);
    return null;
  }
};

// (Câu 4b) Hàm cập nhật (đã có)
export const updateExpense = (id: number, title: string, amount: number, type: 'income' | 'expense') => {
  try {
    db.runSync(
      'UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?;',
      title, amount, type, id
    );
  } catch (error) {
    console.error('Lỗi khi cập nhật Thu/Chi:', error);
  }
};

// (Câu 5b) Hàm "xóa mềm" (đã có)
export const softDeleteExpense = (id: number) => {
  try {
    db.runSync('UPDATE expenses SET isDeleted = 1 WHERE id = ?;', id);
  } catch (error) {
    console.error('Lỗi khi xóa mềm:', error);
  }
};

// (Câu 6b) Hàm lấy các khoản ĐÃ XÓA (đã có)
export const fetchDeletedExpenses = (searchQuery: string = ""): Expense[] => {
  try {
    const query = `SELECT * FROM expenses WHERE isDeleted = 1 AND (title LIKE ?);`;
    const params = [`%${searchQuery}%`];
    const deletedExpenses = db.getAllSync<Expense>(query, params);
    return deletedExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi đã xóa:', error);
    return [];
  }
};

// (Câu 8a) Hàm khôi phục (đã có)
export const restoreExpense = (id: number) => {
  try {
    db.runSync('UPDATE expenses SET isDeleted = 0 WHERE id = ?;', id);
  } catch (error) {
    console.error('Lỗi khi khôi phục:', error);
  }
};
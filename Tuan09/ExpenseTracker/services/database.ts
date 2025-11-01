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
    } catch (e) {
      // Bỏ qua lỗi
    }
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

// Hàm lấy Thu/Chi (CHƯA XÓA) (đã có)
export const fetchExpenses = (): Expense[] => {
  try {
    const allExpenses = db.getAllSync<Expense>('SELECT * FROM expenses WHERE isDeleted = 0;');
    return allExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi:', error);
    return [];
  }
};

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

// --- (MỚI CHO CÂU 5) ---

// (Câu 5b) Hàm "xóa mềm"
export const softDeleteExpense = (id: number) => {
  try {
    // Đánh dấu isDeleted = 1
    db.runSync('UPDATE expenses SET isDeleted = 1 WHERE id = ?;', id);
    console.log('Đã "xóa mềm" Thu/Chi ID:', id);
  } catch (error) {
    console.error('Lỗi khi xóa mềm:', error);
  }
};

// (Câu 5c) Hàm lấy các khoản ĐÃ XÓA (Thùng rác)
export const fetchDeletedExpenses = (): Expense[] => {
  try {
    const deletedExpenses = db.getAllSync<Expense>('SELECT * FROM expenses WHERE isDeleted = 1;');
    return deletedExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi đã xóa:', error);
    return [];
  }
};
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
      // Bỏ qua lỗi nếu cột đã tồn tại
    }
    
    console.log('Bảng "expenses" đã sẵn sàng.');
  } catch (error) {
    console.error('Lỗi khi khởi tạo DB "expenses":', error);
  }
};

// (Câu 3c) Hàm thêm một khoản Thu/Chi mới (đã có)
export const addExpense = (title: string, amount: number, date: string, type: 'income' | 'expense') => {
  try {
    const result = db.runSync(
      'INSERT INTO expenses (title, amount, date, type, isDeleted) VALUES (?, ?, ?, ?, 0);',
      title,
      amount,
      date,
      type
    );
    console.log('Đã thêm Thu/Chi, ID:', result.lastInsertRowId);
  } catch (error) {
    console.error('Lỗi khi thêm Thu/Chi:', error);
  }
};

// Hàm lấy tất cả Thu/Chi (CHƯA XÓA) (đã có)
export const fetchExpenses = (): Expense[] => {
  try {
    const allExpenses = db.getAllSync<Expense>('SELECT * FROM expenses WHERE isDeleted = 0;');
    return allExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi:', error);
    return [];
  }
};

// --- (MỚI CHO CÂU 4) ---

// (Câu 4) Hàm lấy 1 khoản Thu/Chi bằng ID
export const fetchExpenseById = (id: number): Expense | null => {
  try {
    // Dùng getFirstSync<Expense> để lấy 1 bản ghi
    const expense = db.getFirstSync<Expense>('SELECT * FROM expenses WHERE id = ?;', id);
    return expense || null; // Trả về note hoặc null nếu không tìm thấy
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi bằng ID:', error);
    return null;
  }
};

// (Câu 4b) Hàm cập nhật Thu/Chi
export const updateExpense = (id: number, title: string, amount: number, type: 'income' | 'expense') => {
  try {
    // Dùng runSync cho UPDATE
    db.runSync(
      'UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?;',
      title,
      amount,
      type,
      id
    );
    console.log('Đã cập nhật Thu/Chi ID:', id);
  } catch (error) {
    console.error('Lỗi khi cập nhật Thu/Chi:', error);
  }
};
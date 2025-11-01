import * as SQLite from 'expo-sqlite';

// Mở (hoặc tạo) database
const db = SQLite.openDatabaseSync('expenses.db');

// Định nghĩa kiểu dữ liệu cho một khoản Thu/Chi
export type Expense = {
  id: number;
  title: string;
  amount: number; // Số tiền
  date: string;
  type: 'income' | 'expense'; // Loại: Thu | Chi
  isDeleted: number; // 0 = chưa xóa, 1 = đã xóa (cho Câu 5)
};

// Hàm khởi tạo database
export const initDB = () => {
  try {
    // Tạo bảng 'expenses'
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
    
    // Thêm cột isDeleted nếu chưa có (để không crash app cũ)
    try {
      db.execSync('ALTER TABLE expenses ADD COLUMN isDeleted INTEGER DEFAULT 0;');
      console.log('Đã thêm cột "isDeleted" vào bảng "expenses".');
    } catch (e) {
      // Bỏ qua lỗi nếu cột đã tồn tại
    }
    
    console.log('Bảng "expenses" đã sẵn sàng.');
  } catch (error) {
    console.error('Lỗi khi khởi tạo DB "expenses":', error);
  }
};

// (Câu 3c) Hàm thêm một khoản Thu/Chi mới
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

// Hàm lấy tất cả Thu/Chi (CHƯA XÓA)
export const fetchExpenses = (): Expense[] => {
  try {
    // Chỉ lấy (isDeleted = 0)
    const allExpenses = db.getAllSync<Expense>('SELECT * FROM expenses WHERE isDeleted = 0;');
    return allExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi:', error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};
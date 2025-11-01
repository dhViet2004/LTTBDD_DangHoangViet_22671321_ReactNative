import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('expenses.db');

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string; // Format: "dd/mm/yyyy"
  type: 'income' | 'expense';
  isDeleted: number;
};
export type FilterType = 'all' | 'income' | 'expense';

// (Các hàm cũ: initDB, addExpense... giữ nguyên)
// ... (code các hàm initDB, addExpense) ...
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

// (Câu 10b) Hàm lấy Thu/Chi + TÌM KIẾM + LỌC (đã có)
export const fetchExpenses = (searchQuery: string = "", filterType: FilterType = 'all'): Expense[] => {
  try {
    let query = `SELECT * FROM expenses WHERE isDeleted = 0 AND (title LIKE ?)`;
    const params: any[] = [`%${searchQuery}%`];
    if (filterType !== 'all') {
      query += ' AND type = ?';
      params.push(filterType);
    }
    query += ';';
    const allExpenses = db.getAllSync<Expense>(query, params);
    return allExpenses;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi (có lọc):', error);
    return [];
  }
};
// ... (code các hàm fetchExpenseById, updateExpense, softDeleteExpense, fetchDeletedExpenses, restoreExpense) ...
export const fetchExpenseById = (id: number): Expense | null => {
  try {
    const expense = db.getFirstSync<Expense>('SELECT * FROM expenses WHERE id = ?;', id);
    return expense || null;
  } catch (error) {
    console.error('Lỗi khi lấy Thu/Chi bằng ID:', error);
    return null;
  }
};
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
export const softDeleteExpense = (id: number) => {
  try {
    db.runSync('UPDATE expenses SET isDeleted = 1 WHERE id = ?;', id);
  } catch (error) {
    console.error('Lỗi khi xóa mềm:', error);
  }
};
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
export const restoreExpense = (id: number) => {
  try {
    db.runSync('UPDATE expenses SET isDeleted = 0 WHERE id = ?;', id);
  } catch (error) {
    console.error('Lỗi khi khôi phục:', error);
  }
};


// --- (MỚI CHO CÂU 11) ---

// Kiểu dữ liệu trả về của hàm thống kê
export type MonthlyStat = {
  month: string; // "mm/yyyy"
  income: number;
  expense: number;
};

// (Câu 11a) Hàm lấy và xử lý thống kê
export const getMonthlyStats = (): MonthlyStat[] => {
  try {
    // 1. Lấy TẤT CẢ các khoản (chưa xóa)
    const allExpenses = db.getAllSync<Expense>('SELECT * FROM expenses WHERE isDeleted = 0;');

    // 2. Xử lý dữ liệu (gom nhóm bằng JavaScript)
    // Dùng một Map để gom nhóm: { "10/2025": { income: 500, expense: 200 }, ... }
    const statsMap = new Map<string, { income: number, expense: number }>();

    for (const item of allExpenses) {
      // Lấy "mm/yyyy" từ "dd/mm/yyyy"
      const dateParts = item.date.split('/'); // ["31", "10", "2025"]
      if (dateParts.length < 3) continue; // Bỏ qua nếu date sai
      
      const monthYear = `${dateParts[1]}/${dateParts[2]}`; // "10/2025"

      // Lấy (hoặc tạo mới) mục thống kê cho tháng này
      const currentStats = statsMap.get(monthYear) || { income: 0, expense: 0 };

      // Cộng dồn
      if (item.type === 'income') {
        currentStats.income += item.amount;
      } else {
        currentStats.expense += item.amount;
      }
      
      // Cập nhật lại Map
      statsMap.set(monthYear, currentStats);
    }

    // 3. Chuyển Map thành Mảng (Array)
    const result: MonthlyStat[] = [];
    statsMap.forEach((stats, month) => {
      result.push({
        month: month,
        income: stats.income,
        expense: stats.expense,
      });
    });

    // Sắp xếp theo tháng (quan trọng)
    result.sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/');
      const [bMonth, bYear] = b.month.split('/');
      if (aYear !== bYear) return aYear.localeCompare(bYear);
      return aMonth.localeCompare(bMonth);
    });

    return result;

  } catch (error) {
    console.error('Lỗi khi lấy thống kê:', error);
    return [];
  }
};
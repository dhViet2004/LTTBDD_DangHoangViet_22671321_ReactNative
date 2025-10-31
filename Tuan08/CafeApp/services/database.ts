import * as SQLite from 'expo-sqlite';

// Định nghĩa kiểu dữ liệu cho Drink
export type Drink = {
  id: string;
  name: string;
  price: number;
};

// Định nghĩa kiểu dữ liệu cho CartItem
export type CartItem = {
  id: number; // ID tự tăng của SQLite
  drinkId: string;
  name: string;
  price: number;
  quantity: number;
};

// Mở database sử dụng API mới
const db = SQLite.openDatabaseSync('cart.db');

// Hàm khởi tạo bảng
export async function initDB(): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      drinkId TEXT NOT NULL UNIQUE, 
      name TEXT NOT NULL, 
      price REAL NOT NULL, 
      quantity INTEGER NOT NULL
    );
  `);
}

// Hàm thêm/cập nhật giỏ hàng
export async function addItemToCart(drink: Drink): Promise<void> {
  try {
    // Kiểm tra xem item đã tồn tại chưa
    const existing = await db.getFirstAsync<CartItem>(
      'SELECT * FROM cart WHERE drinkId = ?',
      [drink.id]
    );

    if (existing) {
      // Nếu đã có, tăng quantity lên 1
      await db.runAsync(
        'UPDATE cart SET quantity = quantity + 1 WHERE drinkId = ?',
        [drink.id]
      );
    } else {
      // Nếu chưa có, thêm mới
      await db.runAsync(
        'INSERT INTO cart (drinkId, name, price, quantity) VALUES (?, ?, ?, 1)',
        [drink.id, drink.name, drink.price]
      );
    }
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    throw error;
  }
}

// Hàm giảm số lượng item trong giỏ hàng
export async function decreaseItemInCart(drinkId: string): Promise<void> {
  try {
    const existing = await db.getFirstAsync<CartItem>(
      'SELECT * FROM cart WHERE drinkId = ?',
      [drinkId]
    );

    if (existing) {
      if (existing.quantity > 1) {
        // Nếu quantity > 1, giảm đi 1
        await db.runAsync(
          'UPDATE cart SET quantity = quantity - 1 WHERE drinkId = ?',
          [drinkId]
        );
      } else {
        // Nếu quantity = 1, xóa item
        await db.runAsync('DELETE FROM cart WHERE drinkId = ?', [drinkId]);
      }
    }
  } catch (error) {
    console.error('Lỗi khi giảm số lượng:', error);
    throw error;
  }
}

// Hàm xóa item khỏi giỏ hàng
export async function removeItemFromCart(drinkId: string): Promise<void> {
  try {
    await db.runAsync('DELETE FROM cart WHERE drinkId = ?', [drinkId]);
  } catch (error) {
    console.error('Lỗi khi xóa item:', error);
    throw error;
  }
}

// Hàm lấy tất cả các món trong giỏ hàng
export async function getCartItems(): Promise<CartItem[]> {
  try {
    const result = await db.getAllAsync<CartItem>(
      'SELECT * FROM cart WHERE quantity > 0 ORDER BY id DESC'
    );
    return result;
  } catch (error) {
    console.error('Lỗi khi lấy giỏ hàng:', error);
    throw error;
  }
}

// Hàm xóa tất cả items trong giỏ hàng
export async function clearCart(): Promise<void> {
  try {
    await db.runAsync('DELETE FROM cart');
  } catch (error) {
    console.error('Lỗi khi xóa giỏ hàng:', error);
    throw error;
  }
}

export default db;


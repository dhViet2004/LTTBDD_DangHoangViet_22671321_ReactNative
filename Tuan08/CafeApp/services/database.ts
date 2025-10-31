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

// Định nghĩa kiểu dữ liệu cho Order
export type Order = {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

// Định nghĩa kiểu dữ liệu cho OrderItem
export type OrderItem = {
  id: number;
  orderId: number;
  drinkId: string;
  name: string;
  price: number;
  quantity: number;
};

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
    
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber TEXT NOT NULL UNIQUE,
      totalAmount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
    
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      drinkId TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
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

// ========== ORDER FUNCTIONS ==========

// Hàm tạo đơn hàng mới từ giỏ hàng
export async function createOrder(): Promise<Order> {
  try {
    // Lấy tất cả items trong giỏ hàng
    const cartItems = await getCartItems();
    
    if (cartItems.length === 0) {
      throw new Error('Giỏ hàng trống');
    }

    // Tính tổng tiền
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Tạo số đơn hàng (timestamp + random)
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Tạo đơn hàng
    const orderResult = await db.runAsync(
      `INSERT INTO orders (orderNumber, totalAmount, status) 
       VALUES (?, ?, 'pending')`,
      [orderNumber, totalAmount]
    );

    const orderId = orderResult.lastInsertRowId;

    // Thêm các items vào order_items
    for (const item of cartItems) {
      await db.runAsync(
        `INSERT INTO order_items (orderId, drinkId, name, price, quantity) 
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.drinkId, item.name, item.price, item.quantity]
      );
    }

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await clearCart();

    // Lấy đơn hàng vừa tạo
    const order = await db.getFirstAsync<Order>(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );

    if (!order) {
      throw new Error('Không thể tạo đơn hàng');
    }

    return order;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw error;
  }
}

// Hàm lấy tất cả đơn hàng
export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await db.getAllAsync<Order>(
      'SELECT * FROM orders ORDER BY createdAt DESC'
    );
    return orders;
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    throw error;
  }
}

// Hàm lấy chi tiết đơn hàng theo ID
export async function getOrderById(orderId: number): Promise<Order | null> {
  try {
    const order = await db.getFirstAsync<Order>(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );
    return order || null;
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    throw error;
  }
}

// Hàm lấy items của một đơn hàng
export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  try {
    const items = await db.getAllAsync<OrderItem>(
      'SELECT * FROM order_items WHERE orderId = ?',
      [orderId]
    );
    return items;
  } catch (error) {
    console.error('Lỗi khi lấy items của đơn hàng:', error);
    throw error;
  }
}

// Hàm cập nhật trạng thái đơn hàng
export async function updateOrderStatus(
  orderId: number,
  status: string
): Promise<void> {
  try {
    await db.runAsync(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    throw error;
  }
}

// Hàm lấy đơn hàng gần nhất
export async function getLatestOrder(): Promise<Order | null> {
  try {
    const order = await db.getFirstAsync<Order>(
      'SELECT * FROM orders ORDER BY createdAt DESC LIMIT 1'
    );
    return order || null;
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng gần nhất:', error);
    throw error;
  }
}

export default db;


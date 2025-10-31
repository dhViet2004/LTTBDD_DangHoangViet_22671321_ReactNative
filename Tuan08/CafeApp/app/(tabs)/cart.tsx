import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { 
  initDB, 
  getCartItems, 
  CartItem, 
  decreaseItemInCart, 
  addItemToCart,
  createOrder,
  getLatestOrder,
  Order,
  getOrderItems,
  OrderItem
} from '../../services/database';
import type { Drink } from '../../services/api';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  // Khởi tạo database và load dữ liệu
  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          await initDB();
          const items = await getCartItems();
          setCartItems(items);
          
          // Lấy đơn hàng gần nhất
          const order = await getLatestOrder();
          setLatestOrder(order);
          if (order) {
            const items = await getOrderItems(order.id);
            setOrderItems(items);
          }
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      }
      loadData();
    }, [])
  );

  // Tính tổng tiền giỏ hàng
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tính tổng tiền đơn hàng gần nhất
  const orderTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Xử lý tăng số lượng
  const handleIncrease = async (item: CartItem) => {
    try {
      setLoading(true);
      const drink: Drink = {
        id: item.drinkId,
        name: item.name,
        price: item.price,
      };
      await addItemToCart(drink);
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật giỏ hàng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý giảm số lượng
  const handleDecrease = async (item: CartItem) => {
    try {
      setLoading(true);
      await decreaseItemInCart(item.drinkId);
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật giỏ hàng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thanh toán
  const handlePayNow = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Thông báo', 'Giỏ hàng trống');
      return;
    }

    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn thanh toán $${cartTotal.toFixed(2)}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Thanh toán',
          onPress: async () => {
            try {
              setProcessing(true);
              const order = await createOrder();
              
              // Load lại dữ liệu
              const items = await getCartItems();
              setCartItems(items);
              setLatestOrder(order);
              const orderItems = await getOrderItems(order.id);
              setOrderItems(orderItems);
              
              Alert.alert(
                'Thành công',
                `Đơn hàng ${order.orderNumber} đã được tạo thành công!`,
                [{ text: 'OK' }]
              );
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể tạo đơn hàng');
              console.error(error);
            } finally {
              setProcessing(false);
            }
          },
        },
      ]
    );
  };

  // 3. Render Header (các khối màu)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={[styles.summaryCard, { backgroundColor: '#00BCD4' }]}>
        <Text style={styles.summaryTitle}>CAFE DELIVERY</Text>
        <Text style={styles.summaryPrice}>${(cartTotal * 0.2).toFixed(2)}</Text>
      </View>
      {latestOrder && (
        <View style={[styles.summaryCard, { backgroundColor: '#9C27B0' }]}>
          <Text style={styles.summaryTitle}>CAFE (Order {latestOrder.orderNumber})</Text>
          <Text style={styles.summaryPrice}>${orderTotal.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );

  // 4. Render item (giống màn hình Menu)
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={require('../../assets/images/anh1.png')} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.itemControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => handleDecrease(item)}
          disabled={loading}
        >
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10, minWidth: 30, textAlign: 'center' }}>
          {item.quantity}
        </Text>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => handleIncrease(item)}
          disabled={loading}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#00BCD4" />
        </View>
      )}
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
          </View>
        }
      />
      
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng cộng: ${cartTotal.toFixed(2)}</Text>
        </View>
      )}
      
      {/* 6. Nút "PAY NOW" */}
      <TouchableOpacity 
        style={[styles.payButton, (processing || cartItems.length === 0) && styles.payButtonDisabled]}
        onPress={handlePayNow}
        disabled={processing || cartItems.length === 0}
      >
        {processing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>PAY NOW</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Dùng lại nhiều style từ Màn hình 3
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  headerContainer: { padding: 10 },
  summaryCard: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  summaryPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#e0e0e0' },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: '#666', marginTop: 4 },
  itemControls: { flexDirection: 'row', alignItems: 'center' },
  controlButton: {
    backgroundColor: '#00C853',
    borderRadius: 15,
    padding: 5,
  },
  payButton: {
    backgroundColor: '#f0ad4e',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButtonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  totalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'right',
  },
});
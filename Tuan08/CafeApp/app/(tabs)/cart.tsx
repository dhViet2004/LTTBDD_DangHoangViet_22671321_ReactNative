import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Import hàm SQLite
// import { getCartItems, CartItem } from '../../services/database';

// 1. (GIẢ LẬP) Dữ liệu từ SQLite - Bạn sẽ dùng getCartItems()
const CART_DATA = [
  { id: 1, name: 'Salt', price: 5, quantity: 1, drinkId: '103' },
  { id: 2, name: 'Weasel', price: 20, quantity: 1, drinkId: '106' },
];

export default function CartScreen() {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // 2. Dùng useFocusEffect để load data từ SQLite mỗi khi vào màn hình
  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function loadData() {
  //       const items = await getCartItems();
  //       setCartItems(items);
  //     }
  //     loadData();
  //   }, [])
  // );

  // 3. Render Header (các khối màu)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={[styles.summaryCard, { backgroundColor: '#00BCD4' }]}>
        <Text style={styles.summaryTitle}>CAFE DELIVERY</Text>
        <Text style={styles.summaryPrice}>$5</Text>
      </View>
      <View style={[styles.summaryCard, { backgroundColor: '#9C27B0' }]}>
        <Text style={styles.summaryTitle}>CAFE (Order #18)</Text>
        <Text style={styles.summaryPrice}>$25</Text>
      </View>
    </View>
  );

  // 4. Render item (giống màn hình Menu)
  const renderCartItem = ({ item }: { item: typeof CART_DATA[0] }) => (
    <View style={styles.itemContainer}>
      <Image source={require('../../assets/images/anh1.png')} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
        <TouchableOpacity style={styles.controlButton}>
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
      <FlatList
        data={CART_DATA} // Thay bằng state cartItems
        renderItem={renderCartItem}
        ListHeaderComponent={renderHeader} // 5. Gắn header vào
        keyExtractor={(item) => item.id.toString()}
      />
      
      {/* 6. Nút "PAY NOW" */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>PAY NOW</Text>
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
});
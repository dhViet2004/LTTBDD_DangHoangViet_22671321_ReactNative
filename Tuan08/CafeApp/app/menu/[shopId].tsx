import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchDrinksByShop, type Drink } from '../../services/api';
import { initDB, addItemToCart } from '../../services/database';

export default function MenuScreen() {
  const { shopId } = useLocalSearchParams(); // Lấy ID của shop
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy dữ liệu từ API
  useEffect(() => {
    async function loadDrinks() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDrinksByShop(shopId as string);
        setDrinks(data);
      } catch (err) {
        setError('Không thể tải danh sách thức uống');
        console.error('Error loading drinks:', err);
      } finally {
        setLoading(false);
      }
    }

    if (shopId) {
      loadDrinks();
    }
  }, [shopId]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (drink: Drink) => {
    try {
      await initDB();
      await addItemToCart(drink);
      Alert.alert('Thành công', `${drink.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng');
      console.error(error);
    }
  };

  // Hàm render item
  const renderDrinkItem = ({ item }: { item: Drink }) => (
    <View style={styles.itemContainer}>
      <Image source={require('../../assets/images/anh1.png')} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00BCD4" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="alert-circle-outline" size={48} color="#f0ad4e" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            fetchDrinksByShop(shopId as string)
              .then(setDrinks)
              .catch(() => setError('Không thể tải danh sách thức uống'))
              .finally(() => setLoading(false));
          }}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>Không có thức uống nào</Text>
          </View>
        }
      />
      
      {/* 2. Nút "Go To Cart" */}
      <TouchableOpacity 
        style={styles.cartButton} 
        onPress={() => router.push('/(tabs)/cart')}
      >
        <Text style={styles.cartButtonText}>GO TO CART</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#f0ad4e',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#00BCD4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0', // Màu placeholder
  },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: '#666', marginTop: 4 },
  itemControls: { flexDirection: 'row', alignItems: 'center' },
  controlButton: {
    backgroundColor: '#00C853', // Màu xanh lá
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 10,
  },
  cartButton: {
    backgroundColor: '#f0ad4e', // Màu vàng cam
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff', // Hoặc màu đen tùy bạn
    fontSize: 16,
    fontWeight: 'bold',
  },
});
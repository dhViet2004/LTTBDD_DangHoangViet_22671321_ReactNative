import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons'; // Ví dụ dùng icon

// 1. (GIẢ LẬP) Dữ liệu API - Bạn sẽ dùng fetch/useEffect để lấy
const SHOPS_DATA = [
  { id: '1', name: 'Kitanda Espresso', address: '1121 NE 45 St', status: 'Accepting', time: '5-10' },
  { id: '2', name: 'Jewel Box Cafe', address: '1145 GE S4 St', status: 'Unavailable', time: '10-15' },
  { id: '3', name: 'Javasti Cafe', address: '1167 GE S4 St', status: 'Unavailable', time: '15-20' },
];

export default function ShopsScreen() {

  // 2. Hàm render cho mỗi item trong FlatList
  const renderShopItem = ({ item }: { item: typeof SHOPS_DATA[0] }) => {
    const isAvailable = item.status === 'Accepting';
    
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => router.push(`/menu/${item.id}`)} // 3. Điều hướng
      >
        <Image source={require('../../assets/images/anh1.png')} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.shopName}>{item.name}</Text>
          <View style={styles.statusRow}>
            <Feather 
              name={isAvailable ? 'check-circle' : 'slash'} 
              size={14} 
              color={isAvailable ? 'green' : 'red'} 
            />
            <Text style={{ color: isAvailable ? 'green' : 'red', marginLeft: 5 }}>
              {isAvailable ? 'Accepting Orders' : 'Tempory Unavailable'}
            </Text>
            <Ionicons name="time-outline" size={14} color="gray" style={{ marginLeft: 15 }} />
            <Text style={{ color: 'gray', marginLeft: 5 }}>{item.time} minutes</Text>
          </View>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shops Near Me</Text>
      </View>
      {/* 4. Cấu hình tiêu đề (header) của tab */}
      <FlatList
        data={SHOPS_DATA}
        renderItem={renderShopItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.mapPlaceholder} /> // Cái khối xám ở trên cùng
        )}
      />
    </View>
  );
}

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
  mapPlaceholder: { height: 150, backgroundColor: '#e0e0e0', margin: 10, borderRadius: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 3, // Shadow cho Android
    shadowColor: '#000', // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImage: { height: 120, width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  cardContent: { padding: 10 },
  shopName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  address: { fontSize: 14, color: '#666' },
});
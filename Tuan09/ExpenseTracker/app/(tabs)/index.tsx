import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  FlatList,
  Alert,
  TextInput,
  RefreshControl // (MỚI CÂU 7) Import RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';
import { fetchExpenses, softDeleteExpense, Expense } from '../../services/database';

export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // (MỚI CÂU 7) State để quản lý trạng thái "đang làm mới"
  const [refreshing, setRefreshing] = useState(false);

  // (CẬP NHẬT CÂU 7) Tách hàm tải dữ liệu
  const loadExpenses = useCallback(() => {
    try {
      const allExpenses = fetchExpenses(searchQuery);
      setExpenses(allExpenses.reverse()); 
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi:", error);
    }
  }, [searchQuery]); // Phụ thuộc vào searchQuery

  // Tải lại khi focus
  useFocusEffect(loadExpenses);

  // --- (MỚI CÂU 7) Hàm xử lý khi kéo xuống ---
  // (Câu 7a, 7b)
  const onRefresh = useCallback(() => {
    setRefreshing(true); // 1. Bật indicator
    try {
      loadExpenses(); // 2. Gọi lại function GET (tải dữ liệu)
    } catch (error) {
      console.error("Lỗi khi làm mới:", error);
    } finally {
      setRefreshing(false); // 3. Tắt indicator
    }
  }, [loadExpenses]); // Phụ thuộc vào hàm loadExpenses
  // ------------------------------------------

  // (Câu 3) Hàm xử lý khi bấm nút "+"
  const handlePressAdd = () => {
    router.push('/modal');
  };

  // (Câu 5) Hàm xử lý khi "chạm lâu"
  const handleLongPressExpense = (id: number) => {
    Alert.alert(
      "Xác nhận xóa", 
      "Bạn có chắc muốn xóa khoản này?", 
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            try {
              softDeleteExpense(id);
              loadExpenses(); // Tải lại danh sách
            } catch (error) {
              console.error("Lỗi khi xóa:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
        </View>

        {/* Thanh Tìm Kiếm (Câu 6a) */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm khoản thu/chi..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
        </View>

        <FlatList
          style={styles.content}
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          
          // --- (CẬP NHẬT CÂU 7A) ---
          // Thêm prop 'refreshControl' vào FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Trạng thái
              onRefresh={onRefresh} // Hàm được gọi khi kéo
              colors={['#007AFF']} // (Tùy chọn) Màu của indicator
            />
          }
          // ---------------------------

          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
              onPress={() => router.push({ 
                pathname: '/edit',
                params: { id: item.id }
              })}
              onLongPress={() => handleLongPressExpense(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>Không tìm thấy khoản Thu/Chi nào.</Text>
          }
        />

        {/* Nút Add */}
        <TouchableOpacity style={styles.addButton} onPress={handlePressAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// (Styles giữ nguyên như cũ)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7'
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 90,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 34,
  },
});
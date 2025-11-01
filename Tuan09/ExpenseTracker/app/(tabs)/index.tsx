import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  FlatList,
  Alert // (MỚI CÂU 5) Import Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';

// (MỚI CÂU 5) Import hàm softDeleteExpense
import { fetchExpenses, softDeleteExpense, Expense } from '../../services/database';

export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Hàm để tải dữ liệu
  const loadExpenses = useCallback(async () => {
    try {
      const allExpenses = fetchExpenses(); // Hàm này đã được sửa để chỉ lấy chưa xóa
      setExpenses(allExpenses.reverse());
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi:", error);
    }
  }, []);

  // Tự động refresh khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  // (Câu 3) Hàm xử lý khi bấm nút "+"
  const handlePressAdd = () => {
    router.push('/modal');
  };

  // --- (MỚI CHO CÂU 5) ---
  // (Câu 5a, 5b) Hàm xử lý khi "chạm lâu"
  const handleLongPressExpense = (id: number) => {
    // (Câu 5b) Hiển thị hộp thoại xác định
    Alert.alert(
      "Xác nhận xóa", // Tiêu đề
      "Bạn có chắc muốn xóa khoản này? Nó sẽ được chuyển vào Thùng rác.", // Nội dung
      [
        // Nút 1: Hủy
        {
          text: "Hủy",
          style: "cancel"
        },
        // Nút 2: Xóa
        {
          text: "Xóa",
          onPress: () => {
            // Khi bấm Xóa
            try {
              softDeleteExpense(id); // Gọi hàm xóa mềm
              loadExpenses(); // Tải lại danh sách
            } catch (error) {
              console.error("Lỗi khi xóa:", error);
            }
          },
          style: "destructive" // Kiểu phá hủy (chữ màu đỏ trên iOS)
        }
      ]
    );
  };
  // -------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
        </View>

        <FlatList
          style={styles.content}
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
              // (Câu 4) Khi nhấn
              onPress={() => router.push({ 
                pathname: '/edit',
                params: { id: item.id }
              })}
              // (CẬP NHẬT CÂU 5) Khi chạm lâu
              onLongPress={() => handleLongPressExpense(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>Chưa có khoản Thu/Chi nào.</Text>
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
  content: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 20,
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
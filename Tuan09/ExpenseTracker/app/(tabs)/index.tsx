import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  FlatList // Dùng FlatList thay cho ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router'; // Import thêm

// 1. Import ExpenseItem và các hàm database
import ExpenseItem from '../../components/ExpenseItem';
import { fetchExpenses, Expense } from '../../services/database';

export default function HomeScreen() {
  const router = useRouter(); // Lấy router để điều hướng

  // 2. State để lưu danh sách Thu/Chi
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 3. Hàm để tải dữ liệu
  const loadExpenses = useCallback(async () => {
    try {
      const allExpenses = fetchExpenses();
      setExpenses(allExpenses.reverse()); // Hiển thị cái mới nhất lên đầu
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi:", error);
    }
  }, []);

  // 4. Tự động refresh khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  // (Câu 3a, 3b) Hàm xử lý khi bấm nút "+"
  const handlePressAdd = () => {
    router.push('/modal'); // Mở màn hình modal
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
        </View>

        {/* 5. Dùng FlatList để hiển thị danh sách từ state */}
        <FlatList
          style={styles.content}
          data={expenses} // Dữ liệu từ state
          keyExtractor={(item) => item.id.toString()} // Key duy nhất
          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
            />
          )}
          // Hiển thị nếu danh sách rỗng
          ListEmptyComponent={
            <Text style={styles.placeholderText}>Chưa có khoản Thu/Chi nào.</Text>
          }
        />

        {/* Nút Add, gán hàm handlePressAdd */}
        <TouchableOpacity style={styles.addButton} onPress={handlePressAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// (Styles giữ nguyên, chỉ sửa style 'content' và 'placeholderText')
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
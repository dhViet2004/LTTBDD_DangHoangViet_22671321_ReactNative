import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  FlatList,
  Alert,
  TextInput // (MỚI CÂU 6a) Import TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';
import { fetchExpenses, softDeleteExpense, Expense } from '../../services/database';

export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // (MỚI CÂU 6a) State cho thanh tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  // (CẬP NHẬT CÂU 6a) Tải Thu/Chi dựa trên searchQuery
  useFocusEffect(
    useCallback(() => {
      try {
        const allExpenses = fetchExpenses(searchQuery); // Truyền searchQuery vào
        setExpenses(allExpenses.reverse()); 
      } catch (error) {
        console.error("Lỗi khi tải Thu/Chi:", error);
      }
    }, [searchQuery]) // Thêm searchQuery vào dependencies (để tự động tìm khi gõ)
  );

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
              // Tải lại danh sách sau khi xóa
              const allExpenses = fetchExpenses(searchQuery);
              setExpenses(allExpenses.reverse());
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

        {/* --- (MỚI CÂU 6a) Thanh Tìm Kiếm --- */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm khoản thu/chi..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery} // Cập nhật state khi gõ
          />
        </View>
        {/* ------------------------------------ */}

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

// (CẬP NHẬT CÂU 6a) Thêm style cho thanh tìm kiếm
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
  // (MỚI) Style thanh tìm kiếm
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
  // (CẬP NHẬT) Style nội dung
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Bỏ paddingTop
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
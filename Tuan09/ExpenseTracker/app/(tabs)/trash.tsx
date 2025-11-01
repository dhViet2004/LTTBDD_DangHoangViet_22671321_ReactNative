import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  FlatList,
  TextInput,
  RefreshControl,
  Alert // (MỚI CÂU 8) Import Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';

// (MỚI CÂU 8) Import hàm restoreExpense
import { fetchDeletedExpenses, restoreExpense, Expense } from '../../services/database';

export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Hàm tải dữ liệu
  const loadDeletedExpenses = useCallback(() => {
    try {
      const allNotes = fetchDeletedExpenses(searchQuery);
      setDeletedExpenses(allNotes.reverse()); 
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi đã xóa:", error);
    }
  }, [searchQuery]);

  // Tải lại khi focus
  useFocusEffect(loadDeletedExpenses);

  // Hàm xử lý khi kéo làm mới
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      loadDeletedExpenses();
    } catch (error) {
      console.error("Lỗi khi làm mới thùng rác:", error);
    } finally {
      setRefreshing(false);
    }
  }, [loadDeletedExpenses]);

  // --- (MỚI CÂU 8) ---
  // (Câu 8a) Hàm xử lý khi "chạm lâu" để khôi phục
  const handleRestoreExpense = (id: number) => {
    // Hiển thị menu khôi phục
    Alert.alert(
      "Khôi phục khoản này",
      "Bạn có chắc muốn khôi phục khoản thu/chi này?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Khôi phục",
          onPress: () => {
            try {
              restoreExpense(id); // Gọi hàm khôi phục
              loadDeletedExpenses(); // Tải lại danh sách thùng rác
            } catch (error) {
              console.error("Lỗi khi khôi phục:", error);
            }
          },
          style: "default"
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
          <Text style={styles.headerText}>Thùng rác</Text>
        </View>

        {/* Thanh Tìm Kiếm (Câu 6b) */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm trong thùng rác..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          style={styles.content}
          data={deletedExpenses}
          keyExtractor={(item) => item.id.toString()}
          
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
            />
          }

          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
              // (MỚI CÂU 8) Gán sự kiện chạm lâu
              onLongPress={() => handleRestoreExpense(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>Thùng rác trống.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// (Styles giữ nguyên)
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
});
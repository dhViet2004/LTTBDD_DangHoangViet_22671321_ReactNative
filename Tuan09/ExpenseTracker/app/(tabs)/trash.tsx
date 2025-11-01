import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  FlatList,
  TextInput // (MỚI CÂU 6b) Import TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';

// (MỚI CÂU 6b) Import hàm fetchDeletedExpenses
import { fetchDeletedExpenses, Expense } from '../../services/database';

export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);
  
  // (MỚI CÂU 6b) State cho thanh tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  // (CẬP NHẬT CÂU 6b) Tải Thu/Chi đã xóa dựa trên searchQuery
  useFocusEffect(
    useCallback(() => {
      try {
        const allNotes = fetchDeletedExpenses(searchQuery); // Truyền searchQuery
        setDeletedExpenses(allNotes.reverse()); 
      } catch (error) {
        console.error("Lỗi khi tải Thu/Chi đã xóa:", error);
      }
    }, [searchQuery]) // Thêm searchQuery vào dependencies
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Thùng rác</Text>
        </View>

        {/* --- (MỚI CÂU 6b) Thanh Tìm Kiếm --- */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm trong thùng rác..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* ------------------------------------ */}

        <FlatList
          style={styles.content}
          data={deletedExpenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
              // (Sẽ dùng cho Câu 8)
              // onLongPress={() => handleRestoreNote(item.id)}
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

// (CẬP NHẬT CÂU 6b) Thêm style cho thanh tìm kiếm
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
    paddingBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
  },
});
import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router'; 

// (Câu 5c) Import
import ExpenseItem from '../../components/ExpenseItem';
import { fetchDeletedExpenses, Expense } from '../../services/database';

// (Câu 5c) Đây là màn hình "Thùng rác"
export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);

  // (Câu 5c) Tải các khoản đã xóa
  const loadDeletedExpenses = useCallback(() => {
    try {
      const allNotes = fetchDeletedExpenses();
      setDeletedExpenses(allNotes.reverse()); 
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi đã xóa:", error);
    }
  }, []);

  // Tải lại khi focus vào tab này
  useFocusEffect(
    useCallback(() => {
      loadDeletedExpenses();
    }, [loadDeletedExpenses])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* Tiêu đề riêng cho màn hình "Thùng rác" */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Thùng rác</Text>
        </View>

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

// (Styles mới cho màn hình này)
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
});
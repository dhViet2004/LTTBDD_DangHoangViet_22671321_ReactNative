import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Import component ExpenseItem
import ExpenseItem from '../../components/ExpenseItem';

export default function HomeScreen() {
  
  // (Câu 2) Tạo dữ liệu mẫu để hiển thị
  const sampleIncome = {
    title: 'Tiền lương tháng 10',
    amount: 10000000,
    date: '31/10/2025',
    type: 'income' as const, // Phải có 'as const' để TypeScript hiểu
  };

  const sampleExpense = {
    title: 'Ăn tối',
    amount: 150000,
    date: '31/10/2025',
    type: 'expense' as const,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
        </View>

        {/* (Câu 2) Thay thế khu vực nội dung
            Dùng ScrollView để có thể cuộn
        */}
        <ScrollView style={styles.content}>
          {/* Hiển thị Item mẫu: Thu */}
          <ExpenseItem 
            title={sampleIncome.title}
            amount={sampleIncome.amount}
            date={sampleIncome.date}
            type={sampleIncome.type}
          />
          {/* Hiển thị Item mẫu: Chi */}
          <ExpenseItem 
            title={sampleExpense.title}
            amount={sampleExpense.amount}
            date={sampleExpense.date}
            type={sampleExpense.type}
          />
        </ScrollView>

        {/* Nút Add (cho Câu 3) */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// (Styles giữ nguyên, chỉ sửa style 'content')
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
    paddingHorizontal: 20, // Chỉ padding ngang
    paddingTop: 20, // Padding trên
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
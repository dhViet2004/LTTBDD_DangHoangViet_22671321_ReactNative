import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// (Câu 2d) Định nghĩa loại: 'income' (Thu) hoặc 'expense' (Chi)
export type TransactionType = 'income' | 'expense';

// (Câu 2a, 2b, 2c, 2d)
// Định nghĩa các props mà ExpenseItem sẽ nhận
export type ExpenseItemProps = {
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  onPress?: () => void; // Thêm prop này để chuẩn bị cho Câu 4
};

// Đây là component Item
const ExpenseItem = ({ title, amount, date, type, onPress }: ExpenseItemProps) => {
  
  // (Câu 2d) Quyết định màu sắc và icon dựa trên loại
  const isIncome = type === 'income';
  const color = isIncome ? '#2ecc71' : '#e74c3c'; // Xanh lá = Thu, Đỏ = Chi
  const iconName = isIncome ? 'arrow-up-outline' : 'arrow-down-outline';
  const amountString = isIncome ? `+${amount.toLocaleString('vi-VN')} đ` : `-${amount.toLocaleString('vi-VN')} đ`;

  return (
    // Dùng Pressable để có thể bấm vào (sẵn sàng cho Câu 4)
    <Pressable style={styles.container} onPress={onPress}>
      {/* Icon bên trái */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={iconName} size={24} color="white" />
      </View>

      {/* Thông tin ở giữa */}
      <View style={styles.infoContainer}>
        {/* (Câu 2a) Tên khoản chi */}
        <Text style={styles.title}>{title}</Text>
        {/* (Câu 2c) Ngày tạo */}
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Số tiền bên phải */}
      <View style={styles.amountContainer}>
        {/* (Câu 2b) Số tiền */}
        <Text style={[styles.amount, { color: color }]}>{amountString}</Text>
        {/* (Câu 2d) Loại */}
        <Text style={styles.typeText}>{isIncome ? 'Khoản thu' : 'Khoản chi'}</Text>
      </View>
    </Pressable>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row', // Sắp xếp các mục theo hàng ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1, // Chiếm hết không gian còn lại ở giữa
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  date: {
    fontSize: 13,
    color: '#888',
  },
  amountContainer: {
    alignItems: 'flex-end', // Căn phải
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  typeText: {
    fontSize: 13,
    color: '#888',
  },
});

export default ExpenseItem;
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TransactionType = 'income' | 'expense';

export type ExpenseItemProps = {
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  onPress?: () => void; // (Câu 4)
  onLongPress?: () => void; // (MỚI CHO CÂU 5)
};

const ExpenseItem = ({ title, amount, date, type, onPress, onLongPress }: ExpenseItemProps) => {
  
  const isIncome = type === 'income';
  const color = isIncome ? '#2ecc71' : '#e74c3c';
  const iconName = isIncome ? 'arrow-up-outline' : 'arrow-down-outline';
  const amountString = isIncome ? `+${amount.toLocaleString('vi-VN')} đ` : `-${amount.toLocaleString('vi-VN')} đ`;

  return (
    // (CẬP NHẬT) Thêm prop onLongPress
    <Pressable 
      style={styles.container} 
      onPress={onPress}
      onLongPress={onLongPress} // (Câu 5a)
      delayLongPress={300} // Thời gian giữ để kích hoạt
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={iconName} size={24} color="white" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: color }]}>{amountString}</Text>
        <Text style={styles.typeText}>{isIncome ? 'Khoản thu' : 'Khoản chi'}</Text>
      </View>
    </Pressable>
  );
};

// (Styles giữ nguyên)
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
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
    alignItems: 'flex-end',
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
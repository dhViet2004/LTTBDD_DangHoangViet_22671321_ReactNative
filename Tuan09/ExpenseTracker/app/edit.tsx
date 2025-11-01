import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';

// (Câu 4) Import hàm update và fetch
import { updateExpense, fetchExpenseById } from '../services/database';

export default function EditScreen() {
  const router = useRouter();
  
  // (Câu 4a) Lấy 'id' được truyền từ trang chủ
  const { id } = useLocalSearchParams<{ id: string }>();

  // State cho form
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  // (Câu 4a) Tải dữ liệu của item khi màn hình được mở
  useEffect(() => {
    if (id) {
      const expense = fetchExpenseById(Number(id));
      if (expense) {
        // Điền dữ liệu cũ vào form
        setTitle(expense.title);
        setAmount(expense.amount.toString()); // Chuyển số về string cho input
        setType(expense.type);
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy khoản Thu/Chi.');
        router.back();
      }
    }
  }, [id]); // Chạy lại khi id thay đổi

  // (Câu 4b) Hàm xử lý khi bấm nút "Save" (Cập nhật)
  const handleUpdate = () => {
    const numericAmount = parseFloat(amount); // Chuyển số tiền sang số

    // Kiểm tra
    if (!title.trim() || !amount.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và số tiền hợp lệ.');
      return;
    }
    if (!id) return; // Không có ID thì không làm gì

    try {
      // Gọi hàm cập nhật
      updateExpense(Number(id), title, numericAmount, type);

      Alert.alert('Thành công', 'Đã cập nhật khoản Thu/Chi.');
      
      // Quay về trang chủ
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh Sửa Khoản</Text>
      
      {/* Nút chọn Thu/Chi */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>Khoản Chi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>Khoản Thu</Text>
        </TouchableOpacity>
      </View>

      {/* Ô nhập Tên */}
      <TextInput
        style={styles.input}
        placeholder="Tên khoản (VD: Ăn tối, Lương)"
        value={title}
        onChangeText={setTitle}
      />
      {/* Ô nhập Số tiền */}
      <TextInput
        style={styles.input}
        placeholder="Số tiền (VD: 50000)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* (Câu 4b) Nút "Save" (Cập nhật) */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập Nhật</Text>
      </TouchableOpacity>
      
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

// (Styles tương tự file modal.tsx)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    overflow: 'hidden',
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
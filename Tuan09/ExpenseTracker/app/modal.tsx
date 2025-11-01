import React, { useState, useRef } from 'react';
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
import { useRouter } from 'expo-router';

// 1. Import hàm addExpense
import { addExpense } from '../services/database';

export default function ModalScreen() {
  const router = useRouter();

  // 2. State cho form
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense'); // Mặc định là 'Chi'

  // 3. (Câu 3d) Dùng useRef để clear
  const titleInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);

  // (Câu 3c) Hàm xử lý khi bấm nút "Save"
  const handleSave = () => {
    const numericAmount = parseFloat(amount); // Chuyển số tiền sang số

    // Kiểm tra
    if (!title.trim() || !amount.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và số tiền hợp lệ.');
      return;
    }

    try {
      // Lấy ngày tháng hiện tại
      const date = new Date().toLocaleDateString('vi-VN');
      
      // Gọi hàm thêm vào DB
      addExpense(title, numericAmount, date, type);

      Alert.alert('Thành công', 'Đã lưu khoản Thu/Chi.');
      
      // (Câu 3d) Xóa nội dung trong ô nhập bằng ref
      titleInputRef.current?.clear();
      amountInputRef.current?.clear();
      // Reset state
      setTitle('');
      setAmount('');

      // Đóng modal sau khi thêm
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể lưu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Khoản Mới</Text>
      
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
        ref={titleInputRef}
        style={styles.input}
        placeholder="Tên khoản (VD: Ăn tối, Lương)"
        value={title}
        onChangeText={setTitle}
      />
      {/* Ô nhập Số tiền */}
      <TextInput
        ref={amountInputRef}
        style={styles.input}
        placeholder="Số tiền (VD: 50000)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric" // Chỉ hiện bàn phím số
      />

      {/* (Câu 3c) Nút "Save" */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
      
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

// (Styles mới cho màn hình này)
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
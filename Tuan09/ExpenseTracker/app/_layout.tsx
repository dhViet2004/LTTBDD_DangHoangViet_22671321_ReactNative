import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Import hàm initDB
import { initDB } from '../services/database'; 

export default function RootLayout() {

  // 2. Sử dụng useEffect để gọi initDB() khi app khởi động
  useEffect(() => {
    try {
      initDB(); // Gọi hàm khởi tạo DB
      console.log('Database (Expenses) đã được khởi tạo');
    } catch (err) {
      console.error('Lỗi khởi tạo DB:', err);
    }
  }, []); // Mảng rỗng đảm bảo nó chỉ chạy 1 lần

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
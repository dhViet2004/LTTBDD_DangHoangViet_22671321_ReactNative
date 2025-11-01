import React from 'react';
import { Stack } from 'expo-router';

// 1. Import
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    // 2. (Câu 1a) Bọc toàn bộ app
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
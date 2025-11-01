import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const activeColor = '#007AFF'; 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false, 
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      {/* --- (CẬP NHẬT CÂU 5c) --- */}
      <Tabs.Screen
        name="trash" // Đổi "explore" thành "trash"
        options={{
          title: 'Thùng rác', // Tên tab mới
          headerShown: false, // Ẩn header, chúng ta tự tạo sau
          tabBarIcon: ({ color }) => <TabBarIcon name="trash-outline" color={color} />, // Icon thùng rác
        }}
      />
      {/* ------------------------- */}
    </Tabs>
  );
}
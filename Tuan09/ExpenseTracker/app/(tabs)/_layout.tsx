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
      <Tabs.Screen
        name="trash" 
        options={{
          title: 'Thùng rác',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="trash-outline" color={color} />,
        }}
      />
      {/* --- (MỚI CÂU 11a) --- */}
      <Tabs.Screen
        name="statistics" // Tên file: statistics.tsx
        options={{
          title: 'Thống kê', // Tên tab
          headerShown: false, // Ẩn header
          tabBarIcon: ({ color }) => <TabBarIcon name="stats-chart-outline" color={color} />, // Icon
        }}
      />
      {/* ------------------------- */}
    </Tabs>
  );
}
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Dùng icon cho đẹp

// Component helper cho TabBarIcon
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
          title: 'Home', // Chữ hiển thị trên Tab Bar
          
          // (QUAN TRỌNG) Ẩn header mặc định đi
          headerShown: false, 
          
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore" // Tab thứ 2
        options={{
          title: 'Explore', 
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
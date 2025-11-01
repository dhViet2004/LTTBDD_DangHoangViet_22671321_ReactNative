import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

// (Câu 1b) Import SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    // (Câu 1b) Dùng SafeAreaView bọc màn hình
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* (Câu 1b) Dùng View để bố trí layout */}
      <View style={styles.container}>
        
        {/* (Câu 1c) Tiêu đề trên cùng: "EXPENSE TRACKER" */}
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
        </View>

        {/* (Câu 1d) Khu vực nội dung chính */}
        <View style={styles.content}>
          <Text style={styles.placeholderText}>Danh sách Thu/Chi sẽ ở đây...</Text>
        </View>

        {/* (Câu 1d & 3b) Tự thiết kế: Nút Add (chuẩn bị cho Câu 3) */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// (Câu 1d) StyleSheet để làm đẹp
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Chiếm toàn màn hình
    backgroundColor: '#f7f7f7', // Màu nền xám nhạt
  },
  container: {
    flex: 1, // Chiếm toàn bộ không gian của SafeAreaView
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center', // Căn giữa tiêu đề
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5, // Giãn chữ 1 chút cho đẹp
  },
  content: {
    flex: 1, // Chiếm hết không gian còn lại
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
  },
  addButton: {
    position: 'absolute', // Nằm đè lên trên
    right: 25,
    bottom: 90, // Vị trí phía trên Tab Bar
    backgroundColor: '#007AFF', // Màu xanh
    width: 60,
    height: 60,
    borderRadius: 30, // Bo tròn
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
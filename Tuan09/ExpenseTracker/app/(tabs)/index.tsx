import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  FlatList,
  Alert,
  TextInput,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router'; 
import ExpenseItem from '../../components/ExpenseItem';
import { fetchExpenses, softDeleteExpense, Expense } from '../../services/database';

// (MỚI CÂU 9) Import
import { Ionicons } from '@expo/vector-icons'; // Để dùng icon
import axios from 'axios'; // Để gọi API
import Dialog from "react-native-dialog"; // Để tạo Hộp thoại

export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // (MỚI CÂU 9) State cho Dialog đồng bộ
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [tempApiLink, setTempApiLink] = useState(''); // State để lưu link từ ô input

  // --- (CÁC HÀM CŨ) ---

  // (Câu 7) Hàm tải dữ liệu
  const loadExpenses = useCallback(() => {
    try {
      const allExpenses = fetchExpenses(searchQuery);
      setExpenses(allExpenses.reverse()); 
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi:", error);
    }
  }, [searchQuery]);

  // Tải lại khi focus
  useFocusEffect(loadExpenses);

  // (Câu 7) Hàm xử lý khi kéo xuống
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      loadExpenses();
    } catch (error) {
      console.error("Lỗi khi làm mới:", error);
    } finally {
      setRefreshing(false);
    }
  }, [loadExpenses]);

  // (Câu 3) Hàm xử lý khi bấm nút "+"
  const handlePressAdd = () => {
    router.push('/modal');
  };

  // (Câu 5) Hàm xử lý khi "chạm lâu"
  const handleLongPressExpense = (id: number) => {
    Alert.alert(
      "Xác nhận xóa", 
      "Bạn có chắc muốn xóa khoản này?", 
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            try {
              softDeleteExpense(id);
              loadExpenses();
            } catch (error) {
              console.error("Lỗi khi xóa:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // --- (MỚI CÂU 9) ---
  
  // (Câu 9b) Mở Dialog để paste link
  const handleSyncPress = () => {
    setTempApiLink(''); // Xóa link cũ
    setDialogVisible(true); // Mở Dialog
  };

  // Hàm khi bấm "Hủy" trên Dialog
  const handleDialogCancel = () => {
    setDialogVisible(false);
  };

  // (Câu 9b) Hàm khi bấm "Đồng bộ" trên Dialog
  const handleDialogSync = () => {
    if (tempApiLink && tempApiLink.trim() !== "") {
      const formattedLink = tempApiLink.trim().replace(/^https?:\/\//, ''); 
      if (!formattedLink.includes('mockapi.io')) {
          Alert.alert("Lỗi", "Link API không hợp lệ. Phải là link 'mockapi.io'.");
          return;
      }
      executeSync(`https://${formattedLink}`);
    } else {
      Alert.alert("Lỗi", "Bạn chưa nhập link API.");
    }
    setDialogVisible(false); // Đóng Dialog
  };

  // (Câu 9a) Hàm thực thi đồng bộ
  const executeSync = async (apiLink: string) => {
    Alert.alert("Đang đồng bộ...", "Vui lòng chờ. Quá trình này có thể mất vài phút.");
    
    try {
      // BƯỚC 1: (Câu 9a) Xóa toàn bộ data cũ trên API
      console.log("Bắt đầu đồng bộ: Đang lấy data cũ từ API...");
      const response = await axios.get(apiLink);
      const existingData = response.data;

      if (Array.isArray(existingData) && existingData.length > 0) {
        console.log(`Tìm thấy ${existingData.length} mục cũ. Bắt đầu xóa...`);
        // Lặp qua và xóa từng mục
        for (const item of existingData) {
          await axios.delete(`${apiLink}/${item.id}`);
        }
        console.log("Đã xóa xong data cũ trên API.");
      } else {
        console.log("API rỗng, không cần xóa.");
      }

      // BƯỚC 2: (Câu 9a) Lấy data từ SQLite và POST lên API
      const localExpenses = fetchExpenses(); // Lấy tất cả (chưa xóa) từ DB
      
      if (localExpenses.length === 0) {
        Alert.alert("Thông báo", "Đã dọn dẹp API. Không có dữ liệu nội bộ để đẩy lên.");
        return;
      }

      console.log(`Bắt đầu đẩy ${localExpenses.length} mục từ SQLite lên API...`);
      for (const expense of localExpenses) {
        // Chuẩn bị object để gửi đi (bỏ id và isDeleted)
        const { id, isDeleted, ...expenseToSync } = expense; 
        await axios.post(apiLink, expenseToSync);
      }
      
      // BƯỚC 3: Thông báo thành công
      Alert.alert("Thành công", `Đã xóa data cũ và đồng bộ ${localExpenses.length} khoản thu/chi lên API.`);

    } catch (error) {
      console.error("Lỗi khi đồng bộ:", error);
      Alert.alert("Đồng bộ thất bại", "Đã có lỗi xảy ra. Vui lòng kiểm tra lại link API và kết nối mạng.");
    }
  };
  // -------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* (CẬP NHẬT CÂU 9) Thêm nút Đồng bộ vào Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
          <TouchableOpacity style={styles.syncButton} onPress={handleSyncPress}>
            <Ionicons name="cloud-upload-outline" size={26} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Thanh Tìm Kiếm (Câu 6a) */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm khoản thu/chi..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
        </View>

        <FlatList
          style={styles.content}
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
            />
          }
          renderItem={({ item }) => (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              type={item.type}
              onPress={() => router.push({ 
                pathname: '/edit',
                params: { id: item.id }
              })}
              onLongPress={() => handleLongPressExpense(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.placeholderText}>Không tìm thấy khoản Thu/Chi nào.</Text>
          }
        />

        {/* Nút Add */}
        <TouchableOpacity style={styles.addButton} onPress={handlePressAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* --- (MỚI CÂU 9) Dialog Đồng Bộ --- */}
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Đồng bộ API</Dialog.Title>
          <Dialog.Description>
            Vui lòng dán link API MockAPI.io của bạn.
          </Dialog.Description>
          <Dialog.Input 
            placeholder="https://mockapi.io/..."
            onChangeText={setTempApiLink}
            value={tempApiLink}
          />
          <Dialog.Button label="Hủy" onPress={handleDialogCancel} color="grey" />
          <Dialog.Button label="Đồng bộ" onPress={handleDialogSync} />
        </Dialog.Container>
        {/* ------------------------------------ */}

      </View>
    </SafeAreaView>
  );
}

// (CẬP NHẬT CÂU 9) Thêm style cho nút Đồng bộ và Header
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa tiêu đề
    flexDirection: 'row', // Thêm để chứa nút sync
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  // (MỚI) Nút Đồng bộ
  syncButton: {
    position: 'absolute',
    right: 20, // Đặt ở góc phải
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7'
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 90,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
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
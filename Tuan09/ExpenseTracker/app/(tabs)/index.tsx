import React, { useState, useCallback, useEffect } from 'react';
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

// (CẬP NHẬT CÂU 10) Import thêm FilterType
import { fetchExpenses, softDeleteExpense, Expense, FilterType } from '../../services/database';

// (MỚI CÂU 10a) Component nút Lọc
type FilterButtonProps = {
  text: string;
  isActive: boolean;
  onPress: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({ text, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>{text}</Text>
  </TouchableOpacity>
);
// ---------------------------------

export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // (MỚI CÂU 10a) State cho bộ lọc
  const [filterType, setFilterType] = useState<FilterType>('all');

  // (CẬP NHẬT CÂU 10b) Tải Thu/Chi dựa trên searchQuery VÀ filterType
  const loadExpenses = useCallback(() => {
    try {
      // Truyền cả searchQuery và filterType vào
      const allExpenses = fetchExpenses(searchQuery, filterType);
      setExpenses(allExpenses.reverse()); 
    } catch (error) {
      console.error("Lỗi khi tải Thu/Chi:", error);
    }
  }, [searchQuery, filterType]); // Thêm filterType vào dependencies

  // (CẬP NHẬT CÂU 10b) Tải lại khi focus
  useFocusEffect(loadExpenses);

  // (CẬP NHẬT CÂU 10b) Tải lại khi filter hoặc search thay đổi
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]); // loadExpenses đã phụ thuộc vào [searchQuery, filterType]

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
              loadExpenses(); // Tải lại danh sách
            } catch (error) {
              console.error("Lỗi khi xóa:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPENSE TRACKER</Text>
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

        {/* --- (MỚI CÂU 10a) Thanh Lọc --- */}
        
        <View style={styles.filterContainer}>
          <FilterButton 
            text="Tất cả" 
            isActive={filterType === 'all'} 
            onPress={() => setFilterType('all')} 
          />
          <FilterButton 
            text="Thu" 
            isActive={filterType === 'income'} 
            onPress={() => setFilterType('income')} 
          />
          <FilterButton 
            text="Chi" 
            isActive={filterType === 'expense'} 
            onPress={() => setFilterType('expense')} 
          />
        </View>
        {/* ------------------------------- */}

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

      </View>
    </SafeAreaView>
  );
}

// (CẬP NHẬT CÂU 10) Thêm style cho thanh Lọc
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
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5, // Giảm padding
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
  // (MỚI) Style thanh Lọc
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  // (CẬP NHẬT) Style nội dung
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
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

type ChatItem = {
  id: string;
  image: any;
  title: string;
  shop: string;
};

const chatData: ChatItem[] = [
  {
    id: '1',
    image: require('./assets/ca_nau_lau.png'),
    title: 'Ca nấu lẩu, nấu mì mini...',
    shop: 'Shop Devang',
  },
  {
    id: '2',
    image: require('./assets/ga_bo_toi.png'),
    title: '1KG KHÔ GÀ BƠ TỎI',
    shop: 'Shop LTD Food',
  },
  {
    id: '3',
    image: require('./assets/xa_can_cau.png'),
    title: 'Xe cần cẩu đa năng',
    shop: 'Shop Thế giới đồ chơi',
  },
  {
    id: '4',
    image: require('./assets/do_choi_dang_mo_hinh.png'),
    title: 'Đồ chơi dạng mô hình',
    shop: 'Shop Thế giới đồ chơi',
  },
  {
    id: '5',
    image: require('./assets/lanh_dao_gian_don.png'),
    title: 'Lãnh đạo giản đơn',
    shop: 'Shop Minh Long Book',
  },
  {
    id: '6',
    image: require('./assets/hieu_long_con_tre.png'),
    title: 'Hiểu lòng con trẻ',
    shop: 'Minh Long Book',
  },
  {
    id: '7',
    image: require('./assets/trump.jpg'),
    title: 'Donal Trump',
    shop: 'Minh Long Book',
  },
  
];

const ChatScreen = () => {
  const renderItem = ({ item }: { item: ChatItem }) => (
    <View style={styles.chatItem}>
      <Image source={item.image} style={styles.chatImage} />
      <View style={styles.chatText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.shop}>Shop: {item.shop}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={{ color: 'white' }}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={chatData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chat</Text>
          <TouchableOpacity>
            <Entypo name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop
          </Text>
        </View>
        <ChatScreen />
        <View style={styles.footer}>
          <TouchableOpacity>
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1BA9FF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  infoBox: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  chatImage: {
    width: 80,
    height: 90,
    marginRight: 10,
    borderRadius: 5,
  },
  chatText: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shop: {
    fontSize: 14,
    color: '#666',
  },
  chatButton: {
    backgroundColor: '#F31111',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#1BA9FF',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
    paddingHorizontal: 10,
  },
});

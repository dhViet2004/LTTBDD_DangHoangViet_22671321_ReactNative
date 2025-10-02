import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HomeScreenProps {
  navigation: any;
  route: { params?: { selectedImage?: any; selectedColor?: string } };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const selectedImage =
    route.params?.selectedImage || require('../assets/vs_blue.png');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={selectedImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>
          Điện Thoại Vsmart Joy 3 - Hàng chính hãng
        </Text>
        <View style={styles.star}>
          <Ionicons name="star" size={24} color="#E0E41A" />
          <Ionicons name="star" size={24} color="#E0E41A" />
          <Ionicons name="star" size={24} color="#E0E41A" />
          <Ionicons name="star" size={24} color="#E0E41A" />
          <Ionicons name="star" size={24} color="#E0E41A" />
          <Text style={styles.starText}>(Xem 828 đánh giá)</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>1.790.000 đ</Text>
          <Text style={styles.discount}>
            1.790.000 đ
          </Text>
        </View>
        <View style={styles.help}>
          <Text style={styles.helpText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN <Ionicons name="help-circle-outline" size={24} color="black" /></Text>
        </View>
        <TouchableOpacity
          style={styles.colorButton}
          onPress={() => navigation.navigate('ColorSelection')}>
          <Text style={styles.colorButtonText}>4 MÀU-CHỌN MÀU</Text>
          <Ionicons name="arrow-forward" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => console.log('Chọn mua')}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: '100%',
    padding: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 400,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: '#888',
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  colorButtonText: {
    fontSize: 16,
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  star: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  starText: {
    fontSize: 18,
  },
  priceBox:{
    flexDirection:'row',
    marginHorizontal: 15,
    margin:10,
  },
  priceText:{
    fontWeight:'bold',
    marginRight:15,
    fontSize: 20,
  },
  discount:{
    textDecorationLine:'line-through',
    fontSize:20,
    fontWeight:'bold',
    color:'gray',
  },
  help:{
    marginHorizontal:15,
    justifyContent:'center',
  },
  helpText:{
    color:'red',
    fontWeight:'bold'
  }
});

export default HomeScreen;

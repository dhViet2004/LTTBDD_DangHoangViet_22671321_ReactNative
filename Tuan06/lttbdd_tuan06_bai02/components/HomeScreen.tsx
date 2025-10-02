import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HomeScreenProps {
  navigation: any;
  route: { params?: { selectedImage?: any; selectedColor?: string } };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://68d400a5214be68f8c680de4.mockapi.io/Phone')
      .then(res => res.json())
      .then(data => {
        setProduct(data[0]);
        setLoading(false);
      });
  }, []);

  if (loading || !product) {
    return <ActivityIndicator />;
  }

  const selectedImage =
    route.params?.selectedImage || { uri: product.colors[0].image };

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
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.star}>
          {[...Array(product.rating)].map((_, idx) => (
            <Ionicons key={idx} name="star" size={24} color="#E0E41A" />
          ))}
          <Text style={styles.starText}>(Xem {product.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>{product.price.toLocaleString()} đ</Text>
          <Text style={styles.discount}>
            {product.discountPrice.toLocaleString()} đ
          </Text>
        </View>
        <View style={styles.help}>
          <Text style={styles.helpText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN <Ionicons name="help-circle-outline" size={24} color="black" /></Text>
        </View>
        <TouchableOpacity
          style={styles.colorButton}
          onPress={() => navigation.navigate('ColorSelection')}>
          <Text style={styles.colorButtonText}>{product.colors.length} MÀU-CHỌN MÀU</Text>
          <Ionicons name="arrow-forward" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate('Summary', { selectedColor: route.params?.selectedColor || product.colors[0].name })}>
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
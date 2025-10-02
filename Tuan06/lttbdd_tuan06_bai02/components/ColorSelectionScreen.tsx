import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';

interface ColorSelectionScreenProps {
  navigation: any;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ColorSelectionScreen: React.FC<ColorSelectionScreenProps> = ({ navigation }) => {
  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedDisplayName, setSelectedDisplayName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://68d400a5214be68f8c680de4.mockapi.io/Phone')
      .then(res => res.json())
      .then(data => {
        const prod = data[0];
        setProduct(prod);
        setSelectedColor(prod.colors[0].name);
        setSelectedImage({ uri: prod.colors[0].image });
        setSelectedDisplayName(prod.colors[0].displayName);
        setLoading(false);
      });
  }, []);

  const handleColorSelect = (color: any) => {
    setSelectedColor(color.name);
    setSelectedImage({ uri: color.image });
    setSelectedDisplayName(color.displayName);
  };

  if (loading || !product) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <View style={styles.detailsContainer}>
          <Text style={styles.phoneName}>{product.name}</Text>
          <Text style={styles.phoneDetail}>Màu: {selectedDisplayName}</Text>
          <Text style={styles.phoneDetail}>Cung cấp bởi {product.vendor}</Text>
          <Text style={styles.phonePrice}>{product.price.toLocaleString()} đ</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Chọn một màu bên dưới:</Text>
      <View style={styles.colorOptions}>
        {product.colors.map((color: any) => (
          <TouchableOpacity
            key={color.name}
            style={[styles.colorBox, { backgroundColor: color.name }]}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { width: screenWidth * 0.9 }]}
        onPress={() => navigation.navigate('Home', { selectedColor, selectedImage })}
      >
        <Text style={styles.buttonText}>XONG</Text>
      </TouchableOpacity>
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.25,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  phoneName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneDetail: {
    fontSize: 14,
    marginTop: 5,
  },
  phonePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  colorOptions: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBox: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ColorSelectionScreen;
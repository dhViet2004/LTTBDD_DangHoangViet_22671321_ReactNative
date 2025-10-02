import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

interface ColorSelectionScreenProps {
  navigation: any;
}

const colors = [
  { name: 'lightblue', displayName: 'bạc', image: require('../assets/vs_silver.png') },
  { name: 'red', displayName: 'đỏ', image: require('../assets/vs_red.png') },
  { name: 'black', displayName: 'đen', image: require('../assets/vs_black.png') },
  { name: 'blue', displayName: 'xanh', image: require('../assets/vs_blue.png') },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ColorSelectionScreen: React.FC<ColorSelectionScreenProps> = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState<string>('lightblue');
  const [selectedImage, setSelectedImage] = useState<any>(colors[0].image);
  const [selectedDisplayName, setSelectedDisplayName] = useState<string>(colors[0].displayName);

  const handleColorSelect = (color: string, image: any, displayName: string) => {
    setSelectedColor(color);
    setSelectedImage(image);
    setSelectedDisplayName(displayName);
  };

  return (
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <View style={styles.detailsContainer}>
          <Text style={styles.phoneName}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>
          <Text style={styles.phoneDetail}>Màu: {selectedDisplayName}</Text>
          <Text style={styles.phoneDetail}>Cung cấp bởi Tiki Tradding</Text>
          <Text style={styles.phonePrice}>1.790.000 đ</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Chọn một màu bên dưới:</Text>
      <View style={styles.colorOptions}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[styles.colorBox, { backgroundColor: color.name }]}
            onPress={() => handleColorSelect(color.name, color.image, color.displayName)}
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
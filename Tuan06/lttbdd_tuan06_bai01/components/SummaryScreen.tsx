import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

interface SummaryScreenProps {
  route: { params: { selectedColor: string } };
  navigation: any;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ route, navigation }) => {
  const { selectedColor } = route.params;

  const colorImages: { [key: string]: any } = {
    lightblue: require('../assets/vs_silver.png'),
    red: require('../assets/vs_red.png'),
    black: require('../assets/vs_black.png'),
    blue: require('../assets/vs_blue.png'),
  };

  return (
    <View style={styles.container}>
      <Image source={colorImages[selectedColor]} style={styles.image} />
      <Text style={styles.title}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>
      <Text style={styles.price}>1.790.000 đ</Text>
      <Button title="CHỌN MUA" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default SummaryScreen;
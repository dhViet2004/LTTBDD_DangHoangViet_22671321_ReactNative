import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';

interface SummaryScreenProps {
  route: { params: { selectedColor: string } };
  navigation: any;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ route, navigation }) => {
  const { selectedColor } = route.params;
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

  const colorObj = product.colors.find((c: any) => c.name === selectedColor);

  return (
    <View style={styles.container}>
      <Image source={{ uri: colorObj.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
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
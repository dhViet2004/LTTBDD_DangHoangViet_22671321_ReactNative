import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type Product = { id: string; name: string; price: number };

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductItem = ({ product, onAddToCart }: Props) => (
  <View style={styles.item}>
    <Text style={styles.name}>{product.name}</Text>
    <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => onAddToCart(product)}>
      <Text style={styles.buttonText}>Thêm vào giỏ</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e9ecef',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    color: 'blue',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ProductItem;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from './ProductItem';

type Props = {
  cart: Product[];
};

const CartSummary = ({ cart }: Props) => {
  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <View style={styles.cartSummary}>
      <Text style={styles.cartText}>{cartCount} sản phẩm</Text>
      <Text style={styles.cartText}>
        Tổng tiền: {cartTotal.toLocaleString()}đ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartSummary: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    alignItems: 'center',
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
});

export default CartSummary;

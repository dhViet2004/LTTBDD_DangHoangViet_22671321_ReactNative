import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import BookInfo from './components/BookInfo';
import VoucherInput from './components/VoucherInput';
import CartSummary from './components/CartSummary';

export default function App() {
  const [totalPrice, setTotalPrice] = useState(141800);

  const handleQuantityChange = (quantity: number, price: number) => {
    setTotalPrice(price);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <BookInfo onQuantityChange={handleQuantityChange} />
        <VoucherInput />
      </View>
      <CartSummary totalPrice={totalPrice} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

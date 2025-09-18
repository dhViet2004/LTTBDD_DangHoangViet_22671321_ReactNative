import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

// Import ảnh từ thư mục assets
import bookImage from '../assets/book.png';
const ITEM_PRICE = 141800;

interface BookInfoProps {
  onQuantityChange: (quantity: number, totalPrice: number) => void;
}

const BookInfo: React.FC<BookInfoProps> = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const totalPrice = ITEM_PRICE * quantity;

  const handleIncrease = () => {
    setQuantity((q) => {
      const newQ = q + 1;
      onQuantityChange(newQ, ITEM_PRICE * newQ);
      return newQ;
    });
  };
  const handleDecrease = () => {
    setQuantity((q) => {
      const newQ = q > 1 ? q - 1 : 1;
      onQuantityChange(newQ, ITEM_PRICE * newQ);
      return newQ;
    });
  };

  React.useEffect(() => {
    onQuantityChange(quantity, totalPrice);
  }, []);

  return (
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        {/* Ảnh sách */}
        <Image source={bookImage} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.title}>Nguyên hàm, tích phân và ứng dụng</Text>
          <Text style={styles.supplier}>Cung cấp bởi Tiki Trading</Text>
          <Text style={styles.price}>{ITEM_PRICE.toLocaleString()} đ</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.btn} onPress={handleDecrease}>
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleIncrease}>
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textVoucher}>
            <Text style={styles.textMGG}>Mã giảm giá đã lưu</Text>
            <Text style={styles.more}>Xem tại đây</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8, padding: 8 },
  image: { width: 70, height: 90, borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  supplier: { color: '#888', fontSize: 13 },
  price: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  btn: { padding: 6, borderWidth: 1, borderColor: '#888', borderRadius: 4 },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  quantity: { marginHorizontal: 12, fontSize: 16 },
  textVoucher:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  textMGG:{
    fontWeight: 'bold',
  },
  more:{
    color: 'blue'
  }
});

export default BookInfo;

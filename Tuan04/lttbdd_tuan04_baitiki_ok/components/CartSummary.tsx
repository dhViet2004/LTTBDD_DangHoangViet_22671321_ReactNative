import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface CartSummaryProps {
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => (
  <Card style={styles.card}>
    <View style={styles.summaryRow}>
      <Text style={styles.label}>Tạm tính</Text>
      <Text style={styles.total}>{totalPrice.toLocaleString()} đ</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.label}>Thành tiền</Text>
      <Text style={styles.total}>{totalPrice.toLocaleString()} đ</Text>
    </View>
    <TouchableOpacity style={styles.orderBtn}>
      <Text style={styles.orderText}>TIẾN HÀNH ĐẶT HÀNG</Text>
    </TouchableOpacity>
  </Card>
);

const styles = StyleSheet.create({
  card: { marginVertical: 8, padding: 8, },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 16 },
  total: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
  orderBtn: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 12,
  },
  orderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
export default CartSummary;

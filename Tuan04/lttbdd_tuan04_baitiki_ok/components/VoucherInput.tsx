import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from 'react-native-paper';
const VoucherInput: React.FC = () => {
  return (
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput placeholder="Mã giảm giá" style={styles.input} />
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8, padding: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  applyBtn: {
    backgroundColor: '#3498db',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 4,
  },
  applyText: { color: '#fff', fontWeight: 'bold' },
});
export default VoucherInput;

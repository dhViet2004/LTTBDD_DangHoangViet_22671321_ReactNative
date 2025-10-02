import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập từ khóa tìm kiếm:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tìm gì đó..."
        value={keyword}
        onChangeText={setKeyword}
      />
      <Text style={{marginTop: 20}}>Từ khóa: {keyword}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: '80%' },
});
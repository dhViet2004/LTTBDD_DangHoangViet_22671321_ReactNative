import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Item = {
  id: string;
  title: string;
};

const data: Item[] = [
  { id: '1', title: 'Sản phẩm A' },
  { id: '2', title: 'Sản phẩm B' },
  { id: '3', title: 'Sản phẩm C' },
  { id: '4', title: 'Sản phẩm D' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  itemBox: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 18 },
});

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { products } from "./productsData";

export default function ProductDetails({ route }) {
  const { id } = route.params;
  const product = products.find((p) => p.id === id);

  if (!product)
    return <View style={styles.container}><Text>Không tìm thấy sản phẩm.</Text></View>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
      <Text style={styles.desc}>{product.description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  image: { width: 200, height: 200, borderRadius: 15, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, color: "red", marginVertical: 10 },
  desc: { fontSize: 16, textAlign: "center", marginHorizontal: 20, marginTop: 10 },
});
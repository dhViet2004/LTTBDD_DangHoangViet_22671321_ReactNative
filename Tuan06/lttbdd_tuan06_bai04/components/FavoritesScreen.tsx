import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { products } from "./productsData";

export default function FavoritesScreen({ navigation, favorites, setFavorites }) {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {favoriteProducts.length === 0 ? (
        <Text style={{ margin: 20, textAlign: "center" }}>Chưa có sản phẩm yêu thích.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.price.toLocaleString()}đ</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: { width: 60, height: 60, marginRight: 16, borderRadius: 10 },
  title: { fontWeight: "bold", fontSize: 16 },
});
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { products } from "./productsData.js";

export default function ProductsScreen({ navigation, favorites, setFavorites }) {
  const toggleFavorite = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.price.toLocaleString()}đ</Text>
            </View>
            <Button
              title={favorites.includes(item.id) ? "💖" : "🤍"}
              onPress={() => toggleFavorite(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: { width: 60, height: 60, marginRight: 16, borderRadius: 10 },
  title: { fontWeight: "bold", fontSize: 16 },
});
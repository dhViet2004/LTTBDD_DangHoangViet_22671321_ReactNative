import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProductInfoProps {
  image: any;
  title: string;
  subtitle: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ image, title, subtitle }) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} resizeMode="contain" />
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 16,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    marginRight: 16,
    color: "#222",
  },
});

export default ProductInfo;
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ProductItemProps {
  item: {
    image: any;
    title: string;
    rating: number;
    reviews: number;
    price: string;
    discount: string;
  };
}

function renderStar(rating: number) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[...Array(5)].map((_, idx) => (
        <Ionicons
          key={idx}
          name={idx < rating ? 'star' : 'star-outline'}
          size={15}
          color="#FFD700"
        />
      ))}
    </View>
  );
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => (
  <View style={styles.productItem}>
    <Image source={item.image} style={styles.productImage} resizeMode="contain" />
    <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
    <View style={styles.ratingRow}>
      {renderStar(item.rating)}
      <Text style={styles.ratingText}>{` (${item.reviews})`}</Text>
    </View>
    <View style={styles.priceRow}>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.discount}>{item.discount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 160, // Tùy chỉnh theo màn hình
    maxWidth: 200,
  },
  productImage: {
    width: '100%',
    height: 90,
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: '#f7f7f7',
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 2,
    color: '#222',
    minHeight: 36
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 6,
  },
  discount: {
    fontSize: 12,
    color: '#1BA9FF',
    fontWeight: 'bold',
  }
});

export default ProductItem;
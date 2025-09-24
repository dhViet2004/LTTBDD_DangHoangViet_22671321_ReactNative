import React from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import ProductItem from './ProductItem';

interface Product {
  id: string;
  image: any;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  discount: string;
}
interface ProductListProps {
  data: Product[];
}

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 30) / numColumns;

const ProductList: React.FC<ProductListProps> = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <ProductItem item={item} />}
    keyExtractor={item => item.id}
    numColumns={numColumns}
    contentContainerStyle={styles.listContent}
  />
);

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 60,
  },
});

export default ProductList;
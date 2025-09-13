import React from 'react';
import { FlatList } from 'react-native';
import ProductItem, { Product } from './ProductItem';

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const ProductList = ({ products, onAddToCart }: Props) => (
  <FlatList
    data={products}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <ProductItem product={item} onAddToCart={onAddToCart} />
    )}
  />
);

export default ProductList;

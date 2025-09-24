import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import ProductList from './components/ProductList';
import BottomNavigation from './components/BottomNavigation';

const DATA = [
  {
    id: '1',
    image: require('./assets/giacchuyen 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
  {
    id: '2',
    image: require('./assets/daynguon 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
  {
    id: '3',
    image: require('./assets/dauchuyendoipsps2 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
  {
    id: '4',
    image: require('./assets/dauchuyendoi 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
  {
    id: '5',
    image: require('./assets/carbusbtops2 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
  {
    id: '6',
    image: require('./assets/daucam 1.png'),
    title: 'Cáp chuyển từ Cổng USB sang PS2...',
    rating: 4,
    reviews: 15,
    price: '69.900 đ',
    discount: '-39%',
  },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header />
        <ProductList data={DATA} />
        <BottomNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

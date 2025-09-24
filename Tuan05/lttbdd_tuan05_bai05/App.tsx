import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GalleryScreen from './components/GalleryScreen';

const App: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <GalleryScreen />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
});

export default App;
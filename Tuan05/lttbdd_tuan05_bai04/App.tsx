import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HorizontalUserList from './components/HorizontalUserList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HorizontalUserList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
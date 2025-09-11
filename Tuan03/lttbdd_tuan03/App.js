import { Text, StyleSheet, View } from 'react-native';
import GiaoDien08 from './components/GiaoDien08'

export default function App() {
  return (
    <View style={styles.container}>
      <GiaoDien08/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasswordOutputProps {
  password: string;
}

const PasswordOutput: React.FC<PasswordOutputProps> = ({ password }) => (
  <View style={styles.container}>
    <Text style={styles.password}>{password}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A40',
    marginVertical: 20,
    padding: 15,
    borderRadius: 4,
    minHeight: 40,
    justifyContent: 'center',
  },
  password: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
});

export default PasswordOutput;
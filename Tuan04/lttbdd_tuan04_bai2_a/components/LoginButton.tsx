import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>LOGIN</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    borderRadius: 3,
    marginTop: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default LoginButton;
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ForgotPasswordProps {
  onPress?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>Forgot your password?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 38,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
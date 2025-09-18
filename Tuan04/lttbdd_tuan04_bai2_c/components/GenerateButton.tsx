import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface GenerateButtonProps {
  onPress: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>GENERATE PASSWORD</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4E4FC9',
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default GenerateButton;
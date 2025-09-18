import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface PasswordLengthInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordLengthInput: React.FC<PasswordLengthInputProps> = ({ value, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>Password length</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      maxLength={2}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    width: 70,
    height: 30,
    borderRadius: 3,
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PasswordLengthInput;
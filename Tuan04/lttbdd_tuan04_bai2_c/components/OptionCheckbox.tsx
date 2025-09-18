import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({ label, checked, onToggle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
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
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#23235B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -2,
  },
});

export default OptionCheckbox;
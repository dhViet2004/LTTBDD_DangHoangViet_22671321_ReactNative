import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputFieldProps {
  iconName: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showEye?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showEye = false,
}) => {
  const [hide, setHide] = useState(secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hide}
        placeholderTextColor="#222"
      />
      {showEye && (
        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Ionicons name={hide ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2c64c',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    marginVertical: 10,
    paddingHorizontal: 14,
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 14,
    color: '#222',
  },
  icon: {
    width: 24,
  },
});

export default InputField;
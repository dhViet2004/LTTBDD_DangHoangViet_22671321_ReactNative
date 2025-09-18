import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface FeedbackInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const FeedbackInput: React.FC<FeedbackInputProps> = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      multiline
      placeholder="Hãy chia sẻ những điều mà bạn thích về sản phẩm"
      placeholderTextColor="#bdbdbd"
      textAlignVertical="top"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 16,
    color: "#444",
    minHeight: 70,
  },
  link: {
    fontSize: 13,
    color: "#000",
    marginTop: 2,
    textAlign: "right",
  },
});

export default FeedbackInput;
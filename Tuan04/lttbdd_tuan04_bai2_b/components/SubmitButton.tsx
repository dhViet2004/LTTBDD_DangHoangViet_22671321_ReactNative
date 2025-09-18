import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.text}>Gửi</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 18,
    backgroundColor: "#4746e4",
    paddingVertical: 13,
    borderRadius: 7,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default SubmitButton;
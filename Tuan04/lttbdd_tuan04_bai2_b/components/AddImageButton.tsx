import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddImageButtonProps {
  onPress: () => void;
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.row}>
      <Ionicons name="camera" size={28} color="#000" style={{marginRight: 8}} />
      <Text style={styles.text}>Thêm hình ảnh</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#8000ff",
    borderRadius: 6,
    padding: 16,
    marginVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center" },
  text: { fontSize: 19, fontWeight: "bold", color: "#000" },
});

export default AddImageButton;
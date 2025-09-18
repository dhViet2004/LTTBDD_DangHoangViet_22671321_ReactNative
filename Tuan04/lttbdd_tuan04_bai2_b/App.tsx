import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, } from "react-native";
import ProductInfo from "./components/ProductInfo";
import RatingStars from "./components/RatingStars";
import AddImageButton from "./components/AddImageButton";
import FeedbackInput from "./components/FeedbackInput";
import SubmitButton from "./components/SubmitButton";

const FeedbackScreen: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>("");

  const handleAddImage = () => {
    Alert.alert("Chức năng thêm hình ảnh đang phát triển!");
  };

  const handleSubmit = () => {
    Alert.alert("Đã gửi đánh giá!", `Số sao: ${rating}\nNội dung: ${feedback}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <ProductInfo
        image={require("./assets/OIP.jpg")} 
        title="USB Bluetooth Music Receiver HJX-001"
        subtitle="Biến loa thường thành loa bluetooth"
      />

      <Text style={styles.label}>Cực kỳ hài lòng</Text>
      <RatingStars rating={rating} onChange={setRating} />

      <AddImageButton onPress={handleAddImage} />

      <FeedbackInput value={feedback} onChangeText={setFeedback} />

      <SubmitButton onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: 14,
    alignItems: "stretch",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  label: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 18,
  },
});

export default FeedbackScreen;
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RatingStarsProps {
  rating: number;
  onChange: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onChange }) => (
  <View style={styles.container}>
    {[1,2,3,4,5].map(i => (
      <TouchableOpacity key={i} onPress={() => onChange(i)} activeOpacity={0.7}>
        <Ionicons
          name="star"
          size={42}
          color={i <= rating ? "#ffe600" : "#d1d1d1"}
          style={styles.star}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  star: { marginHorizontal: 3 },
});

export default RatingStars;
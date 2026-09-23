import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export const CategoryCard = ({ category, isSelected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(category)} activeOpacity={0.7}>
      <View
        style={{
          margin: 5,
          padding: 10,
          borderWidth: 0.5,
          borderColor: "gray",
          borderRadius: 10,
        }}
      >
        <Text>{category.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

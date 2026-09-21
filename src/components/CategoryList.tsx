import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { CategoryCard } from "./CategoryCard";
import { NasaQueries } from "../constants/NasaQueries";

export const CategoryList = ({
  selectedCategory,
  onSelectCategory,
  horizontal = true,
}) => {
  return (
      <View style={{
        padding: 10
      }}>
      <FlatList
        data={NasaQueries}
        keyExtractor={(item) => item.id}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <CategoryCard
            category={item}
            isSelected={selectedCategory?.id === item.id}
            onSelect={onSelectCategory}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

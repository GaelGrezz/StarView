import { View, Text, useWindowDimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../components/HeaderComponent";
import { useState, useEffect } from "react";
import { CategoryList } from "../components/CategoryList";
import { NasaQueries } from "../constants/NasaQueries";
import { useNasaSearch } from "../hooks/useNasaSearch";
import SearchResultsView from "../components/SearchResultsView";

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState(NasaQueries[0]);
  const { height } = useWindowDimensions();

  // Consumimos la API mediante el hook personalizado
  const { sections, loading, error, executeSearch } = useNasaSearch();

  // Cada vez que cambia selectedCategory, ejecutamos la búsqueda en la API de la NASA
  useEffect(() => {
    if (selectedCategory?.searchQuery) {
      executeSearch({ term: selectedCategory.searchQuery });
    }
  }, [selectedCategory, executeSearch]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView edges={["left", "right", "top"]}>
      <StatusBar barStyle="light-content" />
      <View style={{ height, position: "relative" }}>
        {/* Encabezado */}
        <HeaderComponent icon="eye" />

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ marginTop: 25, fontSize: 16 }}>Resultado de:</Text>
          <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: "bold" }}>
            {selectedCategory.label}
          </Text>
        </View>

        <View>
          <SearchResultsView
            sections={sections}
            loading={loading}
            error={error}
            emptyMessage={`No se encontraron imágenes para ${selectedCategory.label}`}
            padding={350}
            horizontal={true}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            position: "absolute",
            bottom: "10%",
            marginBottom: 20,
            left: 0,
            right: 0,
          }}
        >
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

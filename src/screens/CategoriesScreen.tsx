import {
  View,
  Text,
  SafeAreaView,
  SafeAreaViewBase,
  useWindowDimensions,
} from "react-native";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { HeaderComponent } from "../components/HeaderComponent";
import { useState } from "react";
import { CategoryList } from "../components/CategoryList";
import { NasaQueries } from "../constants/NasaQueries";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState(NasaQueries[0]);

  const { height } = useWindowDimensions();

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Aquí es donde tu compañero consumirá la API de la NASA pasando el `category.searchQuery` o `category.id`
    console.log(
      "Categoría seleccionada para consumir API:",
      category.searchQuery,
    );
  };

  return (
    <SafeAreaView>
      <View style={{ height: height, position: "relative"}}>
        <HeaderComponent icon="eye" />
        <View
          style={{
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Resultado de: </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {selectedCategory.label}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: "15%",
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

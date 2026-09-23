import React from "react";
import { View } from "react-native";
import { HeaderComponent } from "../components/HeaderComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchResultsView, { SectionData } from "../components/SearchResultsView";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteScreen() {
  const { favorites } = useFavorites();

  const favoriteSections: SectionData[] = favorites.length > 0
    ? [
        {
          title: "Guardados",
          data: favorites,
        },
      ]
    : [];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent icon="heart" />
        
        <View>
          <SearchResultsView
            sections={favoriteSections}
            loading={false}
            error={null}
            padding={0}
            emptyMessage="Aquí aparecerán tu contenido favorito ¡Sin conexión!"
            horizontal= {false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
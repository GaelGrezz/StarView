import React, { useState } from "react";
import { View } from "react-native";
import { HeaderComponent } from "../components/HeaderComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchResultsView, { SectionData } from "../components/SearchResultsView";
import { AstronomyMedia } from "../services/nasa/types";

export default function FavoriteScreen() {
  // Estado local para los elementos guardados (de momento array vacío)
  const [favoriteItems, setFavoriteItems] = useState<AstronomyMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Adaptamos los datos guardados a la estructura SectionData[]
  const favoriteSections: SectionData[] = favoriteItems.length > 0
    ? [
        {
          title: "Guardados",
          data: favoriteItems,
        },
      ]
    : [];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent icon="heart" />
        
        <View style={{ flex: 1 }}>
          <SearchResultsView
            sections={favoriteSections}
            loading={loading}
            error={null}
            padding={20}
            emptyMessage="Aquí aparecerán tu contenido favorito ¡Sin conexión!"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
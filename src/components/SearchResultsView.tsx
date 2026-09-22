import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { AstronomyMedia } from "../services/nasa/types";
import Ionicons from "@react-native-vector-icons/ionicons";

export interface SectionData {
  title: string;
  data: AstronomyMedia[];
}

interface ISearchResultsView {
  sections: SectionData[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
  padding: number;
}

// Subcomponente individual para manejar el estado visual del botón de favoritos
function MediaCardItem({ img }: { img: AstronomyMedia }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View
      style={{
        width: 200,
        marginRight: 12,
        borderRadius: 8,
      }}
    >
      {img.imageUrl ? (
        <Image
          source={{ uri: img.imageUrl }}
          style={{
            width: "100%",
            height: 140,
            borderRadius: 6,
            marginBottom: 8,
          }}
          resizeMode="cover"
        />
      ) : null}
      <Text
        style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
        numberOfLines={1}
      >
        {img.title}
      </Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          gap: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log("Ver detalles de:", img.title);
          }}
        >
          <Ionicons name={"eye-outline"} size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setIsFavorite(!isFavorite);
            console.log("Guardar a favoritos:", img.title);
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF4D4D" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SearchResultsView({
  sections,
  loading,
  error,
  emptyMessage = "Ingresa un término para explorar el cosmos",
  padding,
}: ISearchResultsView) {
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3A86EF"
        style={{ marginTop: 20 }}
      />
    );
  }

  if (error) {
    return (
      <Text style={{ color: "#FF4D4D", textAlign: "center", marginTop: 20 }}>
        {error}
      </Text>
    );
  }

  return (
    <SectionList
      contentContainerStyle={{ paddingBottom: padding }}
      sections={sections.map((sec) => ({
        title: sec.title,
        data: [sec.data],
      }))}
      keyExtractor={(item, index) => index.toString()}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ marginLeft: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
        </View>
      )}
      ListEmptyComponent={
        !loading ? (
          <Text
            style={{ textAlign: "center", color: "#0350b5", marginTop: 20 }}
          >
            {emptyMessage}
          </Text>
        ) : null
      }
      renderItem={({ item }) => (
        <FlatList
          style={{ marginLeft: 20, marginBottom: 20 }}
          data={item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(img, index) =>
            img.id ? img.id.toString() : index.toString()
          }
          renderItem={({ item: img }) => <MediaCardItem img={img} />}
        />
      )}
    />
  );
}
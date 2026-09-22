import {
  View,
  Text,
  StatusBar,
  FlatList,
  SectionList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SeachBar";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNasaSearch } from "../hooks/useNasaSearch";

export default function HomeScreen() {
  const { sections, loading, error, executeSearch } = useNasaSearch();
  const handleSearch = (searchTerm: string) => {
    console.log("Término capturado en la UI: ", searchTerm);
    // todo: Implementar el adaptador de la API...
    executeSearch({ term: searchTerm });
    console.log(sections);
  };
  return (
    <SafeAreaView edges={["left", "right", "top"]}>
      <StatusBar barStyle="default" />
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Ionicons name={"planet"} size={50} />
      </View>
      <View>
        <SearchBar onSearch={handleSearch} />
      </View>
      <SectionList
        contentContainerStyle={{ paddingBottom: 150 }}
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
              Ingresa un término para explorar el cosmos
            </Text>
          ) : null
        }
        // 3. Renderiza la carrusel horizontal de imágenes para esa categoría específica
        renderItem={({ item }) => (
          <FlatList
            style={{ marginLeft: 20, marginBottom: 20 }}
            data={item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(img, index) =>
              img.id ? img.id.toString() : index.toString()
            }
            renderItem={({ item: img }) => (
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
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row-reverse",
                      gap: 10,
                    }}
                  >
                    <Ionicons name={"eye-outline"} size={20} />
                    <Ionicons name={"heart-outline"} size={20} />
                  </View>
                </Text>
              </View>
            )}
          />
        )}
      />
    </SafeAreaView>
  );
}

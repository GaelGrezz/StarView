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
import SearchResultsView from "../components/SearchResultsView";

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
      <SearchResultsView
        sections={sections}
        loading={loading}
        error={error}
        emptyMessage={`No se encontraron imágenes para ${sections}`}
        padding={125} horizontal={true}      />
    </SafeAreaView>
  );
}

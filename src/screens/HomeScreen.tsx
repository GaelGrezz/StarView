import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SeachBar";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function HomeScreen() {
  const handleSearch = (searchTerm: string) => {
    console.log("Término capturado en la UI: ", searchTerm);
    // todo: Implementar el adaptador de la API...
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
    </SafeAreaView>
  );
}

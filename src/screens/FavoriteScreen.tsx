import { View, Text } from "react-native";
import { HeaderComponent } from "../components/HeaderComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <View>
      <SafeAreaView>
        <HeaderComponent icon="heart" />
      </SafeAreaView>
    </View>
  );
}

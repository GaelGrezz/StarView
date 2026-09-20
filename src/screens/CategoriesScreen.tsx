import { View, Text, SafeAreaView } from "react-native";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { HeaderComponent } from '../components/HeaderComponent';

export default function HomeScreen() {

    return (
    <SafeAreaView>
      <View>
        <HeaderComponent icon = "eye" />
      </View>
    </SafeAreaView>
  );
}

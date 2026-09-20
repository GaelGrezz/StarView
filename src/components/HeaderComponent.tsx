import Ionicons from "@react-native-vector-icons/ionicons";
import { StatusBar, View } from "react-native";

export const HeaderComponent = ({icon}) => {
  return (
    <>
      <StatusBar barStyle="default" />
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={50} />
      </View>
    </>
  );
};

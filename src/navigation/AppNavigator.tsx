import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import Ionicons from "@react-native-vector-icons/ionicons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "black",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="planet-outline" size={size} color={color} />
            ),
          }}
          name="Buscar"
          component={HomeScreen}
        />

        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
              <Ionicons name="eye-outline" color={color} size={size} />
            ),
          }}
          name="Categorías"
          component={CategoriesScreen}
        />
        <Tab.Screen name="Favorites" component={FavoriteScreen}
        options={{
          tabBarActiveTintColor: "red",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

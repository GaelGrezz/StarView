import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        options={
          {headerShown: false}
        }
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

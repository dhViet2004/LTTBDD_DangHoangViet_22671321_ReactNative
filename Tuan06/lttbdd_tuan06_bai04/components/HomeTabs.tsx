import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductsScreen from "./ProductsScreen";
import FavoritesScreen from "./FavoritesScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation, favorites, setFavorites }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "Products" ? "pricetag" : "heart";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        children={() => (
          <ProductsScreen
            navigation={navigation}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      />
      <Tab.Screen
        name="Favorites"
        children={() => (
          <FavoritesScreen
            navigation={navigation}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      />
    </Tab.Navigator>
  );
}
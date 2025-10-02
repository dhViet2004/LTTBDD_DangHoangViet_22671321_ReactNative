import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./components/HomeTabs";
import ProductDetails from "./components/ProductDetails";

const Stack = createStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeTabs
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: "Chi tiết sản phẩm" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
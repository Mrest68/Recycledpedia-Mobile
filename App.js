import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { PaperProvider } from "react-native-paper";

// Import screens
import Home from "./components/tabs/Home.js";
import About from "./components/tabs/About.js";
import Curbside from "./components/tabs/Curbside.js";
import Items from "./components/tabs/Items.js";
import Learn from "./components/tabs/Learn.js";
import Tabnav from "./components/Tabnav.js";

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          {/* Tabnav as a screen */}
          <Stack.Screen
            name="MainTabs"
            component={Tabnav}
            options={{ headerShown: false }}
          />
          {/* Additional screens */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Learn"
            component={Learn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Items"
            component={Items}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Curbside"
            component={Curbside}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

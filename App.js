import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Tabnav from './components/Tabnav.js';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tabnav />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
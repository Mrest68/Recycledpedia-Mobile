import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Tabnav from './components/Tabnav.js';
import { enableScreens } from 'react-native-screens';
// Import Firebase and Firestore
//import firebase from '@react-native-firebase/app';
//import firestore from '@react-native-firebase/firestore';

import { firestore } from './config/firebaseConfig';
import { PaperProvider } from "react-native-paper";

enableScreens();

// Firebase initialization is usually handled automatically in React Native with @react-native-firebase
// If initialization is needed (e.g., in Node environments), you could use this:
// if (!firebase.apps.length) {
//   firebase.initializeApp();
// }

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>  
        <View style={styles.container}>
          <Tabnav />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
});
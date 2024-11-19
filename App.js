import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
  // Fetch data from Firestore when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('your_collection').get();
        const data = snapshot.docs.map(doc => doc.data());
        console.log("Firestore Data:", data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

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
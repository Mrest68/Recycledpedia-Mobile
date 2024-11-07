// App.js

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Curbside from './curbside';  // Import the Curbside component

export default function App() {
  return (
    <View style={styles.container}>
      {/* Render the Curbside component instead of the default Text */}
      <Curbside />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


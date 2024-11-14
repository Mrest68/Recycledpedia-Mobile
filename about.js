import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Text style={styles.textTop}>Our Story</Text>
        <Text style={styles.textTopSmall}>
          Since 2006, Dream in Green (DIG) has empowered individuals, particularly youth, to lead the response to climate change and environmental challenges in South Florida. Through partnerships with schools, households, local governments, and businesses, we focus on reducing environmental footprints. By developing and overseeing educational programs and workshops, we promote sustainable behaviors across all age groups, with a special emphasis on K-12 students.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Learn More Pressed!')}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxMiddle}>
        <Text style={styles.text}>Our Mission</Text>
        <Text style={styles.textBottomSmall}>
          One of the major obstacles to effective recycling is contamination—when non-recyclable items are mistakenly placed into recycling systems. Our mission is to provide residents with clear, accessible, and up-to-date recycling information tailored to their specific community. By reducing contamination, we aim to improve recycling rates and help transform waste into valuable resources.
        </Text>
        
        {/* Photo Row */}
        <View style={styles.photoRow}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              style={styles.photo}
              source={{ uri: 'https://via.placeholder.com/60' }} // Placeholder image URL
            />
          ))}
        </View>
      </View>
      <View style={styles.boxBottom}>
        <Text style={styles.textTop}>Our Solution</Text>
        <Text style={styles.textBottomSmall}>
          Recyclepedia is designed to simplify access to accurate recycling information for Miami-Dade County residents. By providing comprehensive guidance on what can and cannot be recycled, Recyclepedia helps reduce contamination and improve recycling success. The platform offers alternatives for disposing of non-recyclable items, directing users to appropriate drop-off locations. By increasing recycling rates, we can reduce pollution and enhance the overall health of our communities.
        </Text>
        <TouchableOpacity style={styles.button2} onPress={() => alert('Learn More Pressed!')}>
          <Text style={styles.buttonText2}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
  },
  boxTop: {
    flex: 1,
    backgroundColor: '#234E13', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  boxMiddle: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15, 
  },
  boxBottom: {
    flex: 1,
    backgroundColor: '#a9def9', 
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
  },
  text: {
    fontSize: 26,
  },
  textTop: { 
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  textTopSmall: { 
    fontSize: 13,
    color: 'white', 
    textAlign: 'center', 
    marginTop: 15,
    marginHorizontal: 3, 
  },
  textBottomSmall: { 
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 3, 
  },
  button: {
    backgroundColor: 'white', 
    paddingVertical: 10,
    paddingHorizontal: 40, 
    borderRadius: 5, 
    marginTop: 15, 
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  button2: {
    backgroundColor: '#234E13',
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    borderRadius: 5, 
    marginTop: 15, 
  },
  buttonText2: {
    color: 'white', 
    textAlign: 'center', 
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15, 
  },
  photo: {
    width: 50, 
    height: 50, 
    borderRadius: 5, 
  },
});

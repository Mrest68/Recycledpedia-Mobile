import { Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, Easing } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Animated, Pressable, Modal} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Calendar } from 'react-native-calendars';



const { width, height } = Dimensions.get('window');

export default function Home() {
  const [email, setEmail] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cloudAnimation = useRef(new Animated.Value(-150)).current; // Start in the middle of the screen
  const cloud2Animation = useRef(new Animated.Value(-150)).current; // Start in the middle of the screen
  const mountainAnimation = useRef(new Animated.Value(0)).current;
  const DiggyAnimation = useRef(new Animated.Value(0)).current;
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);



  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleExplorePress = (message) => {
    Alert.alert('Explore', message);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };



  useEffect(() => {
    const startCloudAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(2000), // Delay to offset floating animation
          Animated.timing(cloud2Animation, {
            toValue: 10, // Move up
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
          Animated.timing(cloud2Animation, {
            toValue: 0, // Move down
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
        ])
      ).start();
    };


    //Diggy
    const startDiggyAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(2000), // Delay to offset floating animation
          Animated.timing(DiggyAnimation, {
            toValue: 10, // Move up
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
          Animated.timing(DiggyAnimation, {
            toValue: 0, // Move down
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
        ])
      ).start();
    };


    // Animation for Cloud 2 (with delay)
    const startCloud2Animation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(2000), // Delay to offset floating animation
          Animated.timing(cloud2Animation, {
            toValue: 10, // Move up
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
          Animated.timing(cloud2Animation, {
            toValue: 0, // Move down
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    // Floating animation for the mountain
    const startMountainAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(mountainAnimation, {
            toValue: 10, // Move up
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
          Animated.timing(mountainAnimation, {
            toValue: 0, // Move down
            duration: 3000, // Adjust speed for smoother float
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startCloudAnimation();
    startCloud2Animation();
    startMountainAnimation();
    startDiggyAnimation();
  }, [cloudAnimation, cloud2Animation, mountainAnimation, DiggyAnimation]);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* Green Sky Background with Animated Clouds */}
      <View style={styles.skyContainer}>
        {/* Cloud 1 */}
        <Animated.Image
          source={require('../../assets/cloud.png')}
          style={[
            styles.cloud,
            { transform: [{ translateY: cloud2Animation }], left: 100, top: 25 },
          ]}
        />

        {/* Cloud 2 */}
        <Animated.Image
          source={require('../../assets/cloud.png')}
          style={[
            styles.cloud,
            { transform: [{ translateY: cloud2Animation }], top: 35 },
          ]}
        />

        {/* Floating Mountain */}
        <Animated.Image
          source={require('../../assets/Mountain.png')} // Replace with your mountain image
          style={[
            styles.mountain,
            { transform: [{ translateY: mountainAnimation }], top: 7 }, // Floating effect
          ]}
        />

        {/* Diggy */}
        <Animated.Image
          source={require('../../assets/Diggy.png')}
          style={[
            styles.diggy,
            { transform: [{ translateY: DiggyAnimation }], left: 85, top: 95 },
          ]}
        />

      </View>

      <View style={styles.container}>
        {/* Image */}
        <Text style={styles.bigTitle}>Recyclopedia</Text>
        {/* Main Title */}
        <Text style={styles.MediumTitle}>Waste Made Simple</Text>
        {/* Main Title */}
        <Text style={styles.littleTitle}>Empowering Miami's Youth in Climate Action</Text>

        {/* Green Button */}
        <TouchableOpacity style={styles.greenButton} onPress={toggleModal}>
          <Text style={styles.greenButtonText}>What is Recyclopedia</Text>
        </TouchableOpacity>

        {/* Modal with Blur Background */}
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          {/* Blur Effect */}
          <BlurView style={styles.blurView} blurType="light" blurAmount={10} />

          {/* Green Overlay */}
          <View style={styles.greenOverlay} />

          {/* Modal Content */}
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              The purpose of Recyclopedia is to educate and empower youth, particularly in Miami, about climate action and sustainable practices.
              Through engaging content and interactive lessons, Recyclopedia aims to inspire younger generations to understand recycling, waste
              management, and environmental stewardship, making climate-friendly practices accessible and interesting for students.
            </Text>
            <Pressable style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

        {/* Get Started Section */}
        <Text style={styles.getStartedTitle}>Get Started</Text>

        {/* Take Action Section with Lines */}
        <View style={styles.takeActionContainer}>
          <View style={styles.line} />
          <Text style={styles.takeActionTitle}>TAKE ACTION</Text>
          <View style={styles.line} />
        </View>

        {/* Green Background with Bubbles */}
        <View style={styles.greenBackground}>
          {/* First Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Curbside Pickup</Text>
            <TouchableOpacity onPress={() => handleExplorePress('Explore Curbside Pickup')}>
              <View style={styles.exploreBubble}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Second Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Recyclable Items</Text>
            <TouchableOpacity onPress={() => handleExplorePress('Explore Recyclable Items')}>
              <View style={styles.exploreBubble}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Third Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Learn</Text>
            <TouchableOpacity onPress={() => handleExplorePress('Explore Learn')}>
              <View style={styles.exploreBubble}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Newsletter Section */}
        <View style={styles.newsletterContainer}>
          <View style={styles.newsletterTextContainer}>
            <Text style={styles.newsletterText}>Subscribe to our Newsletter</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.newsletterForm}>
            <Text style={styles.emailLabel}>Email:</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Your Email"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Community Section */}
        <View style={styles.communitySectionContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.communityTitle}>IN THE COMMUNITY</Text>
          <View style={styles.horizontalLine} />
        </View>

        <View style={styles.communityContainer}>
          <View style={styles.communityLeft}>
            <Text style={styles.communitySubtitle}>Community Calendar Header</Text>
            <Text style={styles.communityParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            </Text>
          </View>
        {/* Calendar View Placeholder */}
        <TouchableOpacity style={styles.calendarView} onPress={toggleCalendar}>
          <Text style={styles.calendarText}>Tap to View Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} transparent={true} animationType="fade">
        {/* Blur Effect */}
        <BlurView style={styles.blurView} blurType="light" blurAmount={10} />

        {/* Green Overlay */}
        <View style={styles.greenOverlay} />

        {/* Modal Content */}
        <View style={styles.modalContentCalendar}>
          <Text style={styles.modalTitleCalendar}>Community Calendar</Text>

          {/* Calendar Component */}
          <Calendar
            // Initial Date
            current={new Date().toISOString().split('T')[0]}
            // Allow Month Change
            onMonthChange={(month) => {
              console.log('Month changed', month);
            }}
            // On Day Select
            onDayPress={(day) => {
              console.log('Selected day', day);
            }}
            style={styles.calendar}
          />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  greenButton: {
    backgroundColor: '#2F4F2F', // Aesthetic green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    top: 10
  },
  greenButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  greenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47, 79, 47, 0.3)', // Green with transparency
  },
  modalContent: {
    width: width * 0.85,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: height * 0.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#2F4F2F',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skyContainer: {
    width: '100%',
    height: height * 0.3, // Sky section height
    backgroundColor: '#ADD8E6', // Green sky background
    position: 'absolute',
    top: 0,
    zIndex: -1, // Behind main content
  },
  cloud: {
    position: 'absolute',
    top: 50, // Adjust to your preference
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  diggy: {
    position: 'absolute',
    top: 50, // Adjust to your preference
    width: 300 * 1.5 ,
    height: 160 * 1.5,
    resizeMode: 'contain',
  },
  mountain: {
    position: 'absolute',
    bottom: 20, // Position near the bottom of the sky container
    right: 50, // Float on the right side of the screen
    width: 200 * 2.7,
    height: 150 * 2.7,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    marginTop: height * 0.3, // Push content below the sky section
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.25,
    height: height * 0.125,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  bigTitle: {
    marginTop: -10,
    fontSize: 30,
    textAlign: 'center',
  },
  MediumTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
  },
  littleTitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
    top: -5,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
  dropdownBubble: {
    backgroundColor: '#2F4F2F',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    maxWidth: '80%',
  },
  dropdownText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  getStartedTitle: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
  },
  takeActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  takeActionTitle: {
    fontSize: 20,
    color: 'black',
    marginHorizontal: 10,
  },
  line: {
    flex: 3,
    height: 5,
  },
  greenBackground: {
    backgroundColor: '#2F4F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  blueBubble: {
    backgroundColor: '#ADD8E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  whiteBubble: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  bubbleText: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
  },
  exploreBubble: {
    backgroundColor: '#2F4F2F',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  exploreText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  newsletterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F4F2F',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  newsletterTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  newsletterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  newsletterForm: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  emailInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  signUpText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  communitySectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  horizontalLine: {
    flex: 3,
    height: 5,
    backgroundColor: '#90EE90',
    marginHorizontal: 10,
  },
  communityTitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  communityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  communityLeft: {
    flex: 1,
    paddingRight: 10,
  },
  communitySubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  communityParagraph: {
    fontSize: 14,
    color: '#333',
  },
  calendarView: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#ADD8E6',
    elevation: 5,
  },
  calendarText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContentCalendar: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: height * 0.2,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitleCalendar: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#2F4F2F',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import { Dimensions, Button} from 'react-native';
import React, { useState, useEffect, useRef, Easing } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Animated, Pressable, Modal, KeyboardAvoidingView, Platform} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';







const { width, height } = Dimensions.get('window');

export default function Home({navigation}) {
  const [email, setEmail] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cloudAnimation = useRef(new Animated.Value(-150)).current; // Start in the middle of the screen
  const cloud2Animation = useRef(new Animated.Value(-150)).current; // Start in the middle of the screen
  const mountainAnimation = useRef(new Animated.Value(0)).current;
  const DiggyAnimation = useRef(new Animated.Value(0)).current;
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventTime, setEventTime] = useState(new Date());
  const [eventPlace, setEventPlace] = useState('');
  const [events, setEvents] = useState({});
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [displayEvents, setDisplayEvents] = useState({});
  const [isAddEventCalendarVisible, setIsAddEventCalendarVisible] = useState(false);
  const [isDisplayCalendarVisible, setIsDisplayCalendarVisible] = useState(false);


  //I wanna add this now brotha 

  const [isEventDetailModalVisible, setIsEventDetailModalVisible] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  //adding this as weell brotha 


  // this is new




  // this is new until here 


  //This is new for the time selection
  const [selectedHour, setSelectedHour] = useState(12); // Default to 12 (as a number)
  const [selectedMinute, setSelectedMinute] = useState(0); // Default to 0 (as a number)
  const [selectedPeriod, setSelectedPeriod] = useState('AM'); // Default to 'AM' (as a string)

  //This is for the time selection

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ]);

  // Toggle display calendar modal
  const toggleDisplayCalendar = () => {
    setIsDisplayCalendarVisible(!isDisplayCalendarVisible);
  };

  // Toggle add event calendar modal
  const toggleAddEventCalendar = () => {
    setIsAddEventCalendarVisible(!isAddEventCalendarVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleExplorePress = (message) => {
    Alert.alert('Explore', message);
  };

  const handleSaveTime = () => {
    const hour = parseInt(selectedHour, 10);
    const minute = parseInt(selectedMinute, 10);
    const period = selectedPeriod?.toUpperCase();

    if (
      hour >= 1 &&
      hour <= 12 &&
      minute >= 0 &&
      minute <= 59 &&
      (period === 'AM' || period === 'PM')
    ) {
      const formattedHour = period === 'PM' && hour !== 12 ? hour + 12 : hour;
      const formattedTime = new Date();
      formattedTime.setHours(formattedHour, minute);

      setEventTime(formattedTime); // Save event time
      setIsTimePickerVisible(false); // Close the modal
    } else {
      Alert.alert('Invalid Time', 'Please enter a valid time.');
    }
  };






  const handleDeleteEvent = (date, eventDetails) => {
    setDisplayEvents((prev) => {
      const updatedEvents = { ...prev };
      updatedEvents[date] = updatedEvents[date]?.filter(
        (event) => event.title !== eventDetails.title
      );
      if (updatedEvents[date]?.length === 0) {
        delete updatedEvents[date]; // Remove the date if no events are left
      }
      return updatedEvents;
    });

    // Close the modal
    setIsEventDetailModalVisible(false);

    Alert.alert('Event Deleted', 'The event has been removed from the calendar.');
  };


  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsEventModalVisible(true);
    const events = displayEvents[day.dateString];
    if (events && events.length > 0) {
      setSelectedEventDetails(events[0]); // Assuming one event per date
      setIsEventDetailModalVisible(true); // Show modal
    } 
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setEventTime(selectedTime); // Update the selected time
    }
    setIsTimePickerVisible(false); // Close the picker
  };

  const saveEvent = () => {
    if (!eventTitle || !eventDescription || !eventPlace) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

      const handleFocus = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 50, animated: true }); // Adjust to the necessary position
    }
  };
    // setthe display event
    setDisplayEvents((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        {
          title: eventTitle,
          description: eventDescription,
          time: eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          place: eventPlace,
        },
      ],
    }));

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        {
          title: eventTitle,
          description: eventDescription,
          time: eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          place: eventPlace,
        },
      ],
    }));
    setEventTitle('');
    setEventDescription('');
    setEventPlace('');
    setEventTime(new Date());
    setIsEventModalVisible(false);
    Alert.alert('Success', 'Event added to calendar!');
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
        <Text style={styles.bigTitle}>Recyclepedia</Text>
        {/* Main Title */}
        <Text style={styles.MediumTitle}>Waste Made Simple</Text>
        {/* Main Title */}
        <Text style={styles.littleTitle}>Empowering Miami's Youth in Climate Action</Text>

        {/* Green Button */}
        <TouchableOpacity style={styles.greenButton} onPress={toggleModal}>
          <Text style={styles.greenButtonText}>What is Recyclopedia?</Text>
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

        {/* Take Action Section with Lines */}
        <View style={styles.takeActionContainer}>
          <View style={styles.line} />
          <Text style={styles.takeActionTitle}>Take Action Today</Text>
          <View style={styles.line} />
        </View>

        {/* Green Background with Bubbles */}
        <View style={styles.greenBackground}>
          {/* First Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Curbside Pickup</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Curbside")}>
              <View style={styles.exploreBubble}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Second Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Items</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Items")}>
              <View style={styles.exploreBubble}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Third Bubble */}
          <View style={styles.blueBubble}>
            <View style={styles.whiteBubble} />
            <Text style={styles.bubbleText}>Learn</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Learn")}>
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
              Get involved with your comumunity and make a difference by exploring events, activities, and more!
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
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={isEventModalVisible ? 20 : 10} // Increase blur if Add Event modal is active
        />

        {/* Green Overlay */}
        <View style={styles.greenOverlay} />

        {/* Modal Content */}
        <View style={styles.modalContentCalendar}>
          <Text style={styles.modalTitleCalendar}>Community Calendar</Text>

          {/* Calendar Component */}
          <Calendar
            markedDates={Object.keys(displayEvents).reduce((acc, date) => {
              acc[date] = { marked: true };
              return acc;
            }, {})}
            onDayPress={(day) => {
              const events = displayEvents[day.dateString] || [];
              if (events.length > 0) {
                setSelectedEventDetails(events[0]); // Set the first event (assuming one per day)
                setIsEventDetailModalVisible(true); // Trigger the modal to open
              } else {
                Alert.alert('No Events', 'No events on this day.');
              }
            }}
          />

          {/* Close Button */}
          <TouchableOpacity style={styles.CalendarcloseButton} onPress={toggleCalendar}>
            <Text style={styles.CalendarcloseButtonText}>X</Text>
          </TouchableOpacity>


          {/* Add Event Button */}
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setIsEventModalVisible(true)} // Open Add Event Modal
          >
            <Text style={styles.calendarButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>


        <Modal visible={isEventModalVisible} transparent={true} animationType="slide">
          <BlurView style={styles.blurView} blurType="light" blurAmount={30} />

          <View style={styles.CalendarmodalBackground}>
            <View style={styles.CalendareventModalContent}>
              {/* Wrap all text inside <Text> */}
              <Text style={styles.CalendarmodalTitle}>Add Event</Text>
              <TextInput
                style={styles.Calendarinput}
                placeholder="Event Title"
                placeholderTextColor="#888888" // Set the desired placeholder color
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              <TextInput
                style={styles.Calendarinput}
                placeholder="Event Description"
                placeholderTextColor="#888888" // Set the desired placeholder color
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
              />
              <TextInput
                style={styles.Calendarinput}
                placeholder="Event Place"
                placeholderTextColor="#888888" // Set the desired placeholder color
                value={eventPlace}
                onChangeText={setEventPlace}
              />

                {/* Calendar for Day Selection */}
                <Calendar
                  onDayPress={handleDayPress} // Save selected day
                  markedDates={{
                    [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
                  }}
                />

                {/* Display Selected Date */}
              <Text style={[styles.dateText, { marginBottom: 10 }]}>
                  Selected Date: {selectedDate || 'None'}
                </Text>

              
                <Text style={[styles.inputlabel, { marginBottom: 10 }]}>

              Event Date: {selectedDate || 'None'}</Text>
              <TouchableOpacity
                style={styles.CalendartimeButton}
                onPress={() => setIsTimePickerVisible(true)}
              >
                <Text style={styles.CalendartimeButtonText}>
                  Select Time: {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Text>
              </TouchableOpacity>

               {/* Time Picker */}
            {isTimePickerVisible && (
                <DateTimePicker
                    value={eventTime}
                    mode="time" // Time picker mode
                    is24Hour={false} // Set to true for 24-hour format
                    display="default"
                    onChange={handleTimeChange} // Handle time selection
                />
            )}


              









            
              <TouchableOpacity style={styles.CalendarsaveButton} onPress={saveEvent}>
                <Text style={styles.CalendarsaveButtonText}>Save Event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.CalendarcloseButton} onPress={() => setIsEventModalVisible(false)}>
                <Text style={styles.CalendarcloseButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            </View>
        </Modal>
      </Modal>


      <Modal
        visible={isEventDetailModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.eventDetailModalOverlay}>
          <View style={styles.eventDetailModal}>
            {/* Close Button in Top-Right */}
            <TouchableOpacity
              style={styles.eventDetailCloseButton}
              onPress={() => setIsEventDetailModalVisible(false)}
            >
              <Text style={styles.eventDetailCloseButtonText}>X</Text>
            </TouchableOpacity>

            {/* Event Title */}
            <Text style={styles.eventDetailTitle}>
              {selectedEventDetails?.title || 'No Title'}
            </Text>

            {/* Event Details */}
            <Text style={styles.eventDetailText}>
              Description: {selectedEventDetails?.description || 'No Description'}
            </Text>
            <Text style={styles.eventDetailText}>
              Place: {selectedEventDetails?.place || 'No Place'}
            </Text>
            <Text style={styles.eventDetailText}>
              Date: {selectedDate || 'No Date Selected'}
            </Text>
            <Text style={styles.eventDetailText}>
              Time: {selectedEventDetails?.time || 'No Time Selected'}
            </Text>

            {/* Event Image */}
            <Image
              source={require('../../assets/Diggy.png')} // Replace with your character image path
              style={styles.eventCharacterImage}
            />

            {/* Delete Button in Bottom-Right */}
            <TouchableOpacity
              style={styles.eventDetailDeleteButton}
              onPress={() => handleDeleteEvent(selectedDate, selectedEventDetails)}
            >
              <Text style={styles.eventDetailDeleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>




      <Modal
        visible={isTimePickerVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.timePickerModalOverlay}>
          <View style={styles.timePickerModal}>
            {/* Hours Input */}
            <View style={styles.timePickerRow}>
              <Text style={styles.timePickerLabel}>Hour:</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2} // Restrict input to 2 digits
                value={selectedHour?.toString() || ''} // Display current hour or empty
                onChangeText={(value) => {
                  setSelectedHour(value); // Allow free input
                }}
                placeholder="HH"
                placeholderTextColor="gray"
              />
            </View>

            {/* Minutes Input */}
            <View style={styles.timePickerRow}>
              <Text style={styles.timePickerLabel}>Minutes:</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2} // Restrict input to 2 digits
                value={selectedMinute?.toString() || ''} // Display current minutes or empty
                onChangeText={(value) => {
                  setSelectedMinute(value); // Allow free input
                }}
                placeholder="MM"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.timePickerRow}>
              <Text style={styles.timePickerLabel}>AM/PM:</Text>
              <DropDownPicker
                open={isDropdownOpen}
                value={selectedPeriod} // Current value
                items={[
                  { label: 'AM', value: 'AM' },
                  { label: 'PM', value: 'PM' },
                ]}
                setOpen={setIsDropdownOpen}
                setValue={setSelectedPeriod}
                setItems={setDropdownItems}
                style={styles.timePickerDropdown}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.timePickerSaveButton}
              onPress={() => handleSaveTime()}
            >
              <Text style={styles.timePickerSaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>









    </ScrollView>);
  };




const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    backgroundColor:'white',
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
    fontSize: 50,
    textAlign: 'center',
    color:'#6ad04b',
  },
  MediumTitle: {
    fontSize: 30,
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  takeActionContainer: {
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:10,
  },
  takeActionTitle: {
    fontSize: 30,
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
    color: 'white',
    fontSize: 14,
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
  calendarButton: {
    padding: 15,
    backgroundColor: '#2F4F2F',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  calendarButtonText: {
    color: 'white',
    fontSize: 16,
  },
  CalendarmodalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CalendarmodalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  CalendareventModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  Calendarinput: {
    
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  CalendartimeButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  CalendartimeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  CalendarsaveButton: {
    backgroundColor: '#2F4F2F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  CalendarsaveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  CalendarcloseButton: {
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
  CalendarcloseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetailModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  eventDetailModal: {
    width: '80%',
    backgroundColor: '#fff', // White container
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  eventDetailCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  eventDetailCloseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventDetailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  eventCharacterImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    resizeMode: 'contain',
  },
  eventDetailDeleteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    paddingVertical: 5, // Reduced padding
    paddingHorizontal: 5, // Reduced padding
    borderRadius: 8, // Slightly smaller radius for a compact button
    alignItems: 'center',
  },
  eventDetailDeleteButtonText: {
    color: '#fff',
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
  },
  timePickerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  timePickerModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  wheelPicker: {
    width: 100,
    height: 150,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  timePickerLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  timePicker: {
    height: 50,
    width: 100,
    color: 'green', // Green text
  },
  timePickerSaveButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timePickerSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: 60, // Adjust width for input field
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
  timePickerDropdown: {
    width: 100,
    backgroundColor: '#f0f0f0',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginLeft: 105, // Add space to move it more to the right
  },

  



});


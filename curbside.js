import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // Import ScrollView for wrapping the entire page
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Import Ionicons and FontAwesome for social media icons

// Get device width to scale elements dynamically
const { width } = Dimensions.get('window');

const Curbside = () => {
  const [municipality, setMunicipality] = useState('New York'); // Default municipality
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  const municipalities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'];

  // Placeholder items
  const items = [
    { id: '1', name: 'Plastic Bottles', description: 'Empty plastic bottles for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Cardboard Boxes', description: 'Used cardboard boxes to be recycled.', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Cans', description: 'Aluminum cans for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Newspapers', description: 'Old newspapers for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Glass Bottles', description: 'Used glass bottles for recycling.', image: 'https://via.placeholder.com/100' },
  ];

  // Function to handle item selection
  const handleSelectMunicipality = (city) => {
    setMunicipality(city);
    setModalVisible(false); // Close the modal after selection
  };

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the modal item for municipality selection
  const renderMunicipalityModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Municipality</Text>
          <FlatList
            data={municipalities}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelectMunicipality(item)} // Select municipality
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );

  // Render the item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
    </View>
  );

  // Render the entire component
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* ScrollView to wrap everything to allow scrolling */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={{ flex: 1 }}>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Curbside Pickup Items</Text>
            </View>

            {/* Municipality Section */}
            <View style={styles.municipalitySection}>
              <Text style={styles.municipalityText}>You are in</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setModalVisible(true)} // Show modal when clicked
              >
                <Text style={styles.selectedMunicipality}>{municipality}</Text>
              </TouchableOpacity>
            </View>

            {/* Panel for Search and Items */}
            <View style={styles.panel}>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search items..."
                  value={searchQuery}
                  onChangeText={setSearchQuery} // Update search query
                />
                {/* Magnifying Glass Icon with Blue Circular Background */}
                <View style={styles.searchIconContainer}>
                  <Ionicons 
                    name="search" 
                    size={20} // Slightly smaller icon
                    color="#fff"  // White color for the icon
                  />
                </View>
              </View>

              {/* Border Bar Between Search and Items (Light Blue) */}
              <View style={styles.borderBar} />

              {/* List of Items */}
              <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.itemList}
              />
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              {/* Bottom Header Text */}
              <View style={styles.bottomHeader}>
                <Text style={styles.bottomHeaderText}>Item not listed?</Text>
              </View>

              {/* Button to Find Recycling Locations */}
              <TouchableOpacity style={styles.findButton} onPress={() => alert("Finding where to recycle...")}>
                <Text style={styles.findButtonText}>Find where you can recycle your item</Text>
              </TouchableOpacity>

              {/* Tabs Section (footer with Social Icons and Copyright) */}
              <View style={styles.tabsContainer}>
                {/* Tab buttons */}
                <TouchableOpacity style={styles.tab} onPress={() => alert("Items Tab Clicked")}>
                  <Text style={styles.tabText}>Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => alert("Learn Tab Clicked")}>
                  <Text style={styles.tabText}>Learn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => alert("Contact Tab Clicked")}>
                  <Text style={styles.tabText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => alert("Change Language Tab Clicked")}>
                  <Text style={styles.tabText}>Language</Text>
                </TouchableOpacity>
              </View>

              {/* Copyright and Social Media Icons */}
              <View style={styles.socialContainer}>
                <Text style={styles.copyrightText}>Copyright @ 2024 Recyclepedia</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity onPress={() => alert('Facebook')}>
                    <FontAwesome name="facebook" size={24} color="#4CAF50" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('Instagram')}>
                    <FontAwesome name="instagram" size={24} color="#4CAF50" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('LinkedIn')}>
                    <FontAwesome name="linkedin" size={24} color="#4CAF50" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('Twitter (X)')}>
                    <FontAwesome name="twitter" size={24} color="#4CAF50" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Dropdown Modal */}
        {renderMunicipalityModal()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add some bottom padding to make sure footer is visible
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: width > 400 ? 38 : 32,
    fontWeight: '900',
    color: '#234E13',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  municipalitySection: {
    marginBottom: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  municipalityText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DBF4D2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
  },
  selectedMunicipality: {
    fontSize: 18,
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  panel: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    paddingRight: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 18,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#ADD8E6',
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    marginRight: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemList: {
    maxHeight: 300, // Limit height of items list to ensure scrolling inside the panel
  },
  bottomHeader: {
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomHeaderText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  findButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 2,             // Add a border width
    borderColor: '#000',        // Set border color to black
  },
  findButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Space out the tabs evenly
    backgroundColor: '#234E13', // Green background for the entire container
    marginTop: 20,
    marginBottom: 20,
    width: '100%', // Ensure the container spans full width without rounded edges
  },
  tab: {
    flex: 1, // Ensure each tab takes equal space
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  copyrightText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Curbside;

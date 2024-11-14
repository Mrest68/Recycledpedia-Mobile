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
  ScrollView,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Get device width to scale elements dynamically
const { width } = Dimensions.get('window');

const Curbside = () => {
  const [municipality, setMunicipality] = useState('Click Here!');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const municipalities = [
    'Miami', 'Homestead', 'Florida City', 'Miami Beach', 'Coral Gables', 'Hialeah', 
    'North Miami', 'Opa-locka', 'Miami Springs', 'South Miami', 'Golden Beach', 
    'North Miami Beach', 'Miami Shores', 'Biscayne Park', 'Surfside', 'El Portal', 
    'Indian Creek Village', 'Sweetwater', 'North Bay Village', 'West Miami', 
    'Bay Harbor Islands', 'Bal Harbour', 'Virginia Gardens', 'Hialeah Gardens', 
    'Medley', 'Key Biscayne', 'Aventura', 'Pinecrest', 'Sunny Isles Beach', 
    'Miami Lakes', 'Palmetto Bay', 'Miami Gardens', 'Doral', 'Cutler Bay'
  ];

  const items = [
    { id: '1', name: 'Plastic Bottles', description: 'Empty plastic bottles for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Cardboard Boxes', description: 'Used cardboard boxes to be recycled.', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Cans', description: 'Aluminum cans for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Newspapers', description: 'Old newspapers for recycling.', image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Glass Bottles', description: 'Used glass bottles for recycling.', image: 'https://via.placeholder.com/100' },
  ];

  const handleSelectMunicipality = (city) => {
    setMunicipality(city);
    setModalVisible(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onPress={() => handleSelectMunicipality(item)}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.modalFlatList}
          />
        </View>
      </View>
    </Modal>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./curbside2.png')}
        style={styles.backgroundImage} // Apply style to make the image cover the screen
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={{ flex: 1 }}>
              {/* Header Section */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Curbside Pickup Items</Text>
              </View>

              {/* Municipality Section */}
              <View style={styles.municipalitySection}>
                <Text style={styles.municipalityText}>You are in</Text>
                <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
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
                    onChangeText={setSearchQuery}
                  />
                  <View style={styles.searchIconContainer}>
                    <Ionicons name="search" size={20} color="#fff" />
                  </View>
                </View>

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
                <View style={styles.bottomHeader}>
                  <Text style={styles.bottomHeaderText}>Item not listed?</Text>
                </View>

                <TouchableOpacity style={styles.findButton} onPress={() => alert("Finding where to recycle...")}>
                  <Text style={styles.findButtonText}>Find where you can recycle your item</Text>
                </TouchableOpacity>

                <View style={styles.tabsContainer}>
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

          {renderMunicipalityModal()}
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Set the background as transparent because ImageBackground will cover the screen
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  backgroundImage: {
    flex: 1, // Ensure the image covers the entire screen
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  header: {
    backgroundColor: '#234E13',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  headerTitle: {
    fontSize: width > 400 ? 40 : 34,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    maxHeight: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  modalFlatList: {
    maxHeight: 300,
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
    maxHeight: 300,
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomHeader: {
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
  },
  findButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%', // Make it full width
    backgroundColor: '#234E13',
    marginTop: 20,
    marginBottom: 0,
  },
  
  tab: {
    flex: 1, // This ensures each tab takes up an equal portion of the width
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

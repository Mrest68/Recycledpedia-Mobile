import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';


const { width } = Dimensions.get('window');

const Curbside = () => {
  const [municipality, setMunicipality] = useState('Click Here!');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [funFactVisible, setFunFactVisible] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState('');

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

  const funFacts = [
    'Did you know? Recycling just one ton of paper saves 17 trees!',
    'Did you know? Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
    'Did you know? Plastic bottles can take up to 450 years to decompose in landfills.',
    'Did you know? Recycling a single glass bottle saves enough energy to light a 100-watt bulb for 4 hours.',
    'Did you know? Recycling reduces the need for mining raw materials, conserving natural resources.',
    'Did you know? If every American recycled their newspaper, we could save about 250 million trees annually.',
    'Did you know? Recycling helps reduce greenhouse gas emissions, making it an important action for climate change.',
    'Did you know? Americans recycle less than 30% of their waste, but that number could easily be higher.',
    'Did you know? A single recycled plastic bottle can take 450 years to decompose, while recycled plastic can be reused for new products.',
    'Did you know? Recycling creates more jobs than landfilling or incinerating waste.',
    'Did you know? The world’s first recycling plant opened in 1970 in the US.',
    'Did you know? Recycling aluminum saves 95% of the energy needed to make new aluminum from raw materials.',
    'Did you know? Recycling one ton of cardboard saves 9 cubic yards of landfill space.',
    'Did you know? Recycling steel and tin cans saves 74% of the energy needed to make new steel from raw materials.',
    'Did you know? Recycling electronic waste helps prevent toxic chemicals like mercury and lead from entering our environment.',
    'Did you know? Recycling 1,000 pounds of plastic saves up to 7,400 kWh of energy, enough to power your home for 6 months!',
    'Did you know? By recycling just one glass bottle, you can save enough energy to power a computer for 30 minutes.',
    'Did you know? Recycling one ton of paper can save enough water to supply one person with water for 26 years!',
    'Did you know? In the US, over 2.5 million plastic bottles are used every hour. Only a fraction of them get recycled.',
    'Did you know? The first recycling program in the United States was launched in 1896 in New York City.'
  ];

  const handleSelectMunicipality = (city) => {
    setMunicipality(city);
    setModalVisible(false);
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/company/dream-in-green/')  // Replace with the actual LinkedIn URL
      .catch(err => console.error("Failed to open URL:", err));
  };
  
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/dreamingreenmia')  // Replace with the actual Instagram URL
      .catch(err => console.error("Failed to open URL:", err));
  };
  
  const handleTwitterPress = () => {
    Linking.openURL('https://x.com/dream_in_green')  // Replace with the actual X (Twitter) page URL
      .catch(err => console.error("Failed to open URL:", err));
  };
  

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/dreamingreen/')
      .catch(err => console.error("Failed to open URL:", err));
  };  

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleCharacterClick = () => {
    // Select a random fun fact
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFunFact(randomFact);
    setFunFactVisible(true);
  };

  const closeFunFactModal = () => {
    setFunFactVisible(false);
  };

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
    <View style={styles.container}>
      <ImageBackground
        source={require('./curbside2.png')}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={{ flex: 1 }}>
              {/* Header Section */}
              <View style={styles.header}>
                {/* Character Image */}
                <TouchableOpacity onPress={handleCharacterClick}>
                  <Image
                    source={require('./Diggy.png')}
                    style={styles.characterImage}
                  />
                </TouchableOpacity>
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
                    {/* Facebook Icon */}
                    <TouchableOpacity onPress={handleFacebookPress}>
                        <FontAwesome name="" size={24} color="#FFFFFF" style={styles.icon} />
                    </TouchableOpacity>

                    {/* Instagram Icon */}
                    <TouchableOpacity onPress={handleInstagramPress}>
                        <FontAwesome name="" size={24} color="#FFFFFF" style={styles.icon} />
                    </TouchableOpacity>

                    {/* LinkedIn Icon */}
                    <TouchableOpacity onPress={handleLinkedInPress}>
                        <FontAwesome name="" size={24} color="#FFFFFF" style={styles.icon} />
                    </TouchableOpacity>

                    {/* X (Twitter) Icon */}
                    <TouchableOpacity onPress={handleTwitterPress}>
                        <FontAwesome name="" size={24} color="#FFFFFF" style={styles.icon} />
                    </TouchableOpacity>
                    </View>

                </View>
              </View>
            </View>
          </ScrollView>

          {renderMunicipalityModal()}

          {/* Fun Fact Modal */}
          {funFactVisible && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={funFactVisible}
              onRequestClose={closeFunFactModal}
            >
              <View style={styles.funFactModalBackground}>
                <View style={styles.funFactModalContainer}>
                  <Text style={styles.funFactText}>{currentFunFact}</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={closeFunFactModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes full screen height
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
    paddingVertical: 20,
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
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 10, // Additional space around the character for iOS
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
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    backdropFilter: 'blur(10px)', // Optional blur for iOS 14 and above
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    backdropFilter: 'blur(10px)', // Optional blur for iOS 14 and above
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    color: '#FFFFFF',
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
    width: '100%', 
    backgroundColor: '#006838',
    marginTop: 20,
  },
  
  tab: {
    flex: 1, 
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

  // Fun Fact Modal Styles
  funFactModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  funFactModalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  funFactText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Curbside;
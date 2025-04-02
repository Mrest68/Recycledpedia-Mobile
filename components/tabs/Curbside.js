import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image 
} from 'react-native';
import { cityData } from '../data/CityData.js';
import RecyclingList from '../RecyclingList.js';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const Curbside = ({navigation}) => {
  const [city, setCity] = useState('');
  const [recyclingItems, setRecyclingItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    setRecyclingItems(cityData[selectedCity] || []);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredItems = recyclingItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    
  );

  
  const DoAndDontSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Curbside Pickup Do's and Don't's</Text>
      {/* Your Do's and Don't's items go here */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Curbside Pickup Items</Text>
          <Text style={styles.subtitle}>
            Find out what you can recycle in {city || 'your municipality'}
          </Text>
        </View>

        <View style={styles.cityPickerContainer}>
          <Text style={styles.cityPickerLabel}>Select your city:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={city}
              onValueChange={handleCityChange}
            >
              <Picker.Item label="Select a City" value="" />
              {Object.keys(cityData).map((cityName) => (
                <Picker.Item 
                  key={cityName} 
                  label={cityName} 
                  value={cityName} 
                />
              ))}
            </Picker>
          </View>
        </View>

        {city && (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Search for recycling items..."
              />
              <Image
                source={require('../../assets/magnifyingGlass.png')}
                style={styles.searchIcon}
              />
            </View>

            <RecyclingList 
              items={filteredItems} 
              city={city} 
              cityData={cityData} 
            />

            <DoAndDontSection />
            <View style={styles.alternativeContainer}>
              <Text style={styles.alternativeText}>
                Can't find what you're looking for?
              </Text>
              <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Paper</Text>
        <Text style={styles.itemDescription}>
          Clean and dry newspaper, magazines, catalogs, telephone books, printer paper, copier paper, mail, and all other office paper without wax liners.
        </Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Cardboard</Text>
        <Text style={styles.itemDescription}>
          Packing boxes, cereal boxes, pizza boxes, gift boxes, and corrugated cardboard. Flatten all boxes before placing them in your cart.
        </Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Cans</Text>
        <Text style={styles.itemDescription}>
          Steel and aluminum food and beverage cans. Aluminum bottles are also accepted.
        </Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Cartons</Text>
        <Text style={styles.itemDescription}>
          Aseptic poly-coated drink boxes, juice cartons, and milk cartons.
        </Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Bottles (plastic & glass)</Text>
        <Text style={styles.itemDescription}>
          Plastic bottles such as milk, water, detergent, soda, and shampoo bottles (flatten and replace the cap); glass bottles.
        </Text>
      </View>

      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Plastic tubs and jugs</Text>
        <Text style={styles.itemDescription}>
          Plastic tubs, such as butter or yogurt tubs, and plastic jugs, such as milk or detergent jugs.
        </Text>
      </View>
    
              <TouchableOpacity style={styles.alternativeButton} onPress={()=> navigation.navigate("Items")}>
                <Text style={styles.alternativeButtonText}>
                  Find Alternative Recycling Options
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
//






const styles = StyleSheet.create({
  // General Containers
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  contentContainer: { 
    marginHorizontal: 10,
  },

  // Header Styles
  headerContainer: { 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  title: { 
    fontSize: 28, 
    color: '#6ad04b', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666' 
  },

  // City Picker Styles
  cityPickerContainer: { 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 15, 
    marginHorizontal: 20, 
    marginVertical: 10 
  },
  cityPickerLabel: { 
    fontSize: 16, 
    color: '#234E13', 
    marginBottom: 10 
  },
  pickerWrapper: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10 
  },

  // Search Styles
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  searchInput: { 
    flex: 1, 
    height: 50, 
    fontSize: 16 
  },
  searchIcon: { 
    width: 20, 
    height: 20 
  },

  // Section Styles
  sectionContainer: { 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#234E13', 
    marginBottom: 15, 
    textAlign: 'center' 
  },

  // Alternative Section Styles
  alternativeContainer: { 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 50, 
    alignItems: 'center' 
  },
  alternativeText: { 
    fontSize: 18, 
    color: '#666', 
    marginBottom: 15 
  },
  alternativeButton: { 
    backgroundColor: '#234E13', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 15 
  },
  alternativeButtonText: { 
    color: 'white', 
    fontSize: 16, 
    textAlign: 'center' 
  },

  // Item Section Styles
  itemSection: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3 // For Android shadow
  },
  itemTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#234E13', 
    marginBottom: 5 
  },
  itemDescription: { 
    fontSize: 14, 
    color: '#666', 
    lineHeight: 20 
  },
});

export default Curbside;

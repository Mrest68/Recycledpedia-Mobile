import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button, ActivityIndicator, Alert, Linking, Dimensions } from 'react-native';
import { Menu, Provider, Button as PaperButton } from 'react-native-paper';
import * as Location from 'expo-location';
import { firestore } from '../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

// For screen width
const { width } = Dimensions.get('window');

const availableCategories = [
  'Batteries',
  'Miscellaneous',
  'Electronics',
  'Plastics',
  'Appliances',
  'Yard Waste',
  'Household Items',
  'Paper',
  'Cans',
  'Cardboard',
  'Cartons',
  'Hazardous Waste',
  'Medication',
  'Textiles',
  'Glass',
  'Furniture',
  'Metals',
  'Plastic Bottles'
];

// Available items
export const availableItems = [
  '9v Batteries',
  'AA Batteries',
  'AAA Batteries',
  'Air Conditioner',
  'Alkaline Batteries',
  'Aluminum',
  'Aluminum Cans',
  'Aluminum Furniture',
  'Aluminum Gutters',
  'Aluminum Pie Pans',
  'Aluminum Wheels',
  'Audio Devices',
  'Barbecues',
  'Batteries',
  'Beer Bottles',
  'Beer Cans',
  'Bicycles',
  'Blankets',
  'Blenders',
  'Book Shelf',
  'Books',
  'Brass',
  'Brita Water Filters',
  'Brush',
  'C Batteries',
  'Cables',
  'Calculators',
  'Cameras',
  'Cans',
  'Car Batteries',
  'Car Gadgets',
  'Cardboard',
  'Cars',
  'Carton',
  'Catalogs',
  'CDs',
  'Cell Phones',
  'Cereal Box',
  'CFL Bulbs',
  'Chain Link Fence',
  'Chairs',
  'Chargers',
  'Chicken Broth Carton',
  'Christmas Lights',
  'Clothing',
  'Coffee Maker',
  'Coffee Table',
  'Comforters',
  'Commercial Waste',
  'Computer Paper',
  'Computers',
  'Condensed Milk Carton',
  'Conditioner Bottles',
  'Construction Paper',
  'Construction Materials',
  'Cooking Pots',
  'Copper',
  'Corks',
  'Couch',
  'Cushions',
  'D Batteries',
  'Dead Foliage',
  'Deep Fryers',
  'Desks',
  'Detergent Bottle',
  'Dishes',
  'Dishwasher',
  'Dress',
  'Dryer',
  'DVD Player',
  'DVDs',
  'Electric Motors',
  'Electronics',
  'Farm Machinery',
  'Fitness Trackers',
  'Flash Drives',
  'Fluorescent Bulbs',
  'Foam Egg Cartons',
  'Freezer',
  'Gas Cans',
  'Glass',
  'Glass Bottles',
  'Glasses',
  'Glossy Paper',
  'GPS',
  'Grass',
  'Half & Half Carton',
  'Hammers',
  'Hard Drives',
  'Headphones',
  'Hot Plate',
  'Household Trash',
  'Humidifier',
  'Hummus Container',
  'Ink Cartridges',
  'Insulated Wires',
  'Iron',
  'Item',
  'Jacket',
  'Jars',
  'Juice Bottles',
  'Juicers',
  'Keurig',
  'Land Clearing',
  'Landscaping',
  'Laptops',
  'Latex Paints',
  'Lawnmower',
  'Lead Acid Batteries',
  'Leaves',
  'Light Bulbs',
  'Magazines',
  'Mail',
  'Mattress',
  'Medications',
  'Microwaves',
  'Milk Bottles',
  'Milk Cartons',
  'Modems',
  'Monitors',
  'Motor',
  'Motor Oil',
  'Motors',
  'Moving Box',
  'Mug',
  'Musical Instruments',
  'Newspaper',
  'Night Stand',
  'Notebook Paper',
  'Office Furniture',
  'Office Paper',
  'Oil Based Paints',
  'Oil Filters',
  'Oil Paints',
  'Olive Oil Bottle',
  'Oven',
  'Oxygen Tank',
  'Packing Peanuts',
  'Paints',
  'Paper',
  'Paper Cups',
  'Paper Egg Cartons',
  'Paper Shopping Bags',
  'Paper Straws',
  'Paper Towel Rolls',
  'Patio Furniture',
  'Pesticides',
  'Phone Batteries',
  'Phone Books',
  'Pizza Box',
  'Plants',
  'Plastic Bags',
  'Plastic Bottles',
  'Plastic Film',
  'Plastic Furniture',
  'Plastic Pots',
  'Plastics',
  'Pool Chemicals',
  'Printers',
  'Propane Tanks',
  'Radiators',
  'Rechargeable Batteries',
  'Refrigerators',
  'Reusable Bottles',
  'Rice Cooker',
  'Rigid Plastics',
  'Routers',
  'Scarf',
  'Scrap Metals',
  'Screen Doors',
  'Screw Drivers',
  'Shampoo Bottles',
  'Sheet Metal',
  'Shirts',
  'Shoes',
  'Silverware',
  'Smart Phones',
  'Socks',
  'Soda Bottles',
  'Soda Cans',
  'Sofas',
  'Soil',
  'Speakers',
  'Sporting Goods',
  'Steel',
  'Stones',
  'Stool',
  'Stove',
  'Styrofoam',
  'Syrup Bottle',
  'T-Shirt',
  'Tables',
  'Tablets',
  'Telephones',
  'Tires',
  'Toaster',
  'Toilet Paper Rolls',
  'Tools',
  'Towels',
  'Toys',
  'Trees',
  'Tuna Cans',
  'TVs',
  'VCRs',
  'Vegetable Cans',
  'Vegetable Oil Bottle',
  'Video Game Consoles',
  'Video Games',
  'Vinyls',
  'Washer',
  'Water Bottles',
  'Water Heaters',
  'Weed Whacker',
  'Window Frames',
  'Wine Bottles',
  'Wood Furniture',
  'Yogurt Cups',
  'Zip Lock Bags'
  
];


// Haversine formula to calculate distances
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8; // Earth's radius in miles
  const toRad = (value) => value * (Math.PI / 180); // Convert degrees to radians

  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

const Items = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [distance, setDistance] = useState(5);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [distanceMenuVisible, setDistanceMenuVisible] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const testLocation = {
        latitude: 25.7572,
        longitude: -80.3743,
      };
      setUserLocation(testLocation);
    };
    requestLocationPermission();
  }, []);

  const fetchFilteredLocations = async () => {
    if (!search.trim()) {
      Alert.alert('Search Required', 'Please enter an item in the search bar.');
      return;
    }
  
    setIsLoading(true);
    try {
      // Fetch the category for the specific item
      const categoryQuery = query(
        collection(firestore, 'recycle_locations'),
        where('item', '==', search) // Directly match the item
      );
  
      const categorySnapshot = await getDocs(categoryQuery);
      if (categorySnapshot.empty) {
        Alert.alert('No Matches', 'No locations found for this item.');
        setFilteredLocations([]);
        setIsLoading(false);
        return;
      }
  
      // Extract the matched category for the searched item
      const matchedCategory = categorySnapshot.docs[0]?.data()?.category;
      if (!matchedCategory) {
        Alert.alert('No Category', 'No category found for this item.');
        setIsLoading(false);
        return;
      }
  
      // Update the category state dynamically
      setCategory(matchedCategory);
  
      // Fetch locations for the specific item
      const locationsList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Filter locations by distance
      const filteredByDistance = locationsList.filter((location) => {
        if (!userLocation) return true; // If user location is unavailable, show all
        const distanceInMiles = haversine(
          userLocation.latitude,
          userLocation.longitude,
          location.latitude,
          location.longitude
        );
        return distanceInMiles <= distance;
      });
  
      setFilteredLocations(filteredByDistance);
    } catch (error) {
      console.error('Error fetching locations:', error);
      Alert.alert('Error', 'An error occurred while fetching data.');
    }
    setIsLoading(false);
  };
  
  

  const handleSearch = () => {
    fetchFilteredLocations();
  };

  const handleSearchInputChange = (text) => {
    setSearch(text);
    if (text.length > 0) {
      const filteredSuggestions = availableItems.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
  };

  const handleLocationPress = (latitude, longitude) => {
    Alert.alert(
      'Navigate to Location',
      'Choose a navigation app to open:',
      [
        {
          text: 'Google Maps',
          onPress: () => {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
            Linking.openURL(url);
          },
        },
        {
          text: 'Apple Maps',
          onPress: () => {
            const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
            Linking.openURL(url);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleLocationPress(item.latitude, item.longitude)}
    >
      <Text style={styles.itemName}>{item.name || 'Unnamed Location'}</Text>
      <Text style={styles.itemDetails}>Address: {item.street}, {item.city}, {item.state} {item.zip}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Item: {item.item}</Text>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Items</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter an item (e.g., Magazines)"
          value={search}
          onChangeText={handleSearchInputChange}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <PaperButton onPress={() => setCategoryMenuVisible(true)}>
                {category || 'Select Category'}
              </PaperButton>
            }
          >
            {availableCategories.map((cat) => (
              <Menu.Item
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setCategoryMenuVisible(false);
                }}
                title={cat}
              />
            ))}
          </Menu>

          <Menu
            visible={distanceMenuVisible}
            onDismiss={() => setDistanceMenuVisible(false)}
            anchor={
              <PaperButton onPress={() => setDistanceMenuVisible(true)}>
                {distance} miles
              </PaperButton>
            }
          >
            {[5, 10, 15, 20].map((miles) => (
              <Menu.Item
                key={miles}
                onPress={() => {
                  setDistance(miles);
                  setDistanceMenuVisible(false);
                }}
                title={`${miles} miles`}
              />
            ))}
          </Menu>

          <Button title="Search" onPress={handleSearch} />
        </View>

        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : filteredLocations.length > 0 ? (
            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          ) : (
            <Text>No matching locations found.</Text>
          )}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: width > 400 ? 40 : 34,
    textAlign: 'center',
    marginVertical: 40,
    color:"#6ad04b",
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestionsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
  },
  suggestionItem: {
    padding: 10,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default Items;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button, ActivityIndicator, Alert, Linking, Dimensions } from 'react-native';
import { Menu, Provider, Button as PaperButton } from 'react-native-paper';
import * as Location from 'expo-location';
import { firestore } from '../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Updated availableCategories array
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

const Items = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [distance, setDistance] = useState(5);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [distanceMenuVisible, setDistanceMenuVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
   
    const requestLocationPermission = async () => {
      const testLocation = {
        "accuracy": 5,
        "altitude": 0,
        "altitudeAccuracy": -1,
        "heading": -1,
        "latitude": 25.7572,
        "longitude": -80.3743,
        "speed": -1
      }
      // let { status } = await Location.requestForegroundPermissionsAsync();
      
      // if (status !== 'granted') {
      //   Alert.alert("Permission Denied", "Location permission is required to find nearby recycling locations.");
      //   return;
      // }
      // let location = await Location.getCurrentPositionAsync({});
      // setUserLocation(location.coords);
      setUserLocation(testLocation);
      console.log(userLocation);

    };
    requestLocationPermission();
  }, []);

  const fetchFilteredLocations = async () => {
    setIsLoading(true);
    try {
      const locationsCollection = collection(firestore, 'recycle_locations');
      const q = query(locationsCollection, where('category', '==', category));
      const querySnapshot = await getDocs(q);

      const locationsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
//25.7562° N, 80.3755° W

      const filteredByDistance = locationsList.filter((location) => {
        if (!userLocation) return true;
        const distanceInMiles = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          location.latitude,
          location.longitude
        );
        return distanceInMiles <= distance;
      });

      setFilteredLocations(filteredByDistance);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
    setIsLoading(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = () => {
    if (!search.trim()) {
      Alert.alert("Search Required", "Please enter a category in the search bar before searching.");
      return;
    }

    // Check if the search input matches an available category
    const matchedCategory = availableCategories.find(
      (cat) => cat.toLowerCase() === search.toLowerCase()
    );

    if (!matchedCategory) {
      Alert.alert("Invalid Category", "Please select a valid category from the suggestions.");
      return;
    }

    setCategory(matchedCategory); // Set the matched category
    fetchFilteredLocations(); // Fetch locations
  };

  const handleSearchInputChange = (text) => {
    setSearch(text);
    if (text.length > 0) {
      const filteredSuggestions = availableCategories.filter((cat) =>
        cat.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setCategory(suggestion);
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
      <Text style={styles.itemName}>{item.yam}</Text>
      <Text style={styles.itemDetails}>{item.street}, {item.city}, {item.state} {item.zip}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Item: {item.item}</Text>
    </TouchableOpacity>
  );


  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          Items
        </Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter a category (e.g., Paper)"
          value={search}
          onChangeText={handleSearchInputChange}
        />
        
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(suggestion)}
              >
                <Text>{suggestion}</Text>
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
                {category ? category : "Select Category"}
              </PaperButton>
            }
          >
            {availableCategories.map((cat) => (
              <Menu.Item
                key={cat}
                onPress={() => { setCategory(cat); setCategoryMenuVisible(false); }}
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
                onPress={() => { setDistance(miles); setDistanceMenuVisible(false); }}
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
              style={styles.list}
            />
          ) : (
            <Text style={styles.noResultsText}>No locations found for this category.</Text>
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
    marginTop:45,
    color:'#6ad04b',

    // textShadowOffset: { width: 1, height: 1 },
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
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
  noResultsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
  
  export default Items;
  

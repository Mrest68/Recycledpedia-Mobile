import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { firestore } from '../../config/firebaseConfig'; // Ensure the correct path
import { collection, query, where, getDocs } from 'firebase/firestore';

const Items = () => {
  const [search, setSearch] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Fetch locations based on the search input (category)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        if (search.trim() === '') {
          setFilteredLocations([]);
          return;
        }

        const locationsCollection = collection(firestore, 'recycle_locations');
        const q = query(locationsCollection, where('category', '==', search));
        const querySnapshot = await getDocs(q);

        const locationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilteredLocations(locationsList);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchLocations();
  }, [search]);

  // Render each location in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.yam}</Text>
      <Text style={styles.itemDetails}>{item.street}, {item.city}, {item.state} {item.zip}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Item: {item.item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Enter a category (e.g., Paper)"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.listContainer}>
        {filteredLocations.length > 0 ? (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 50, // Adjust this value to move the search bar down
  },
  listContainer: {
    flex: 1, // This makes the FlatList container take up the remaining space
  },
  list: {
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

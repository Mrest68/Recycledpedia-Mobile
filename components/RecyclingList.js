import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';
import RecyclingItemCard from './RecyclingItemCard';
import CategoryCard from './CategroyCard';
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '../components/normalize';

const RecyclingList = ({ items, city, cityData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null); 

  const categoriesWithImages = items.reduce((acc, item) => {
    if (!acc.some((category) => category.name === item.category)) {
      acc.push({
      name: item.category,
      image: item.image || 'default_image_url', 
      });
    }
    return acc;
  }, []);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <View style={styles.container}>
      {/* Categories */}
      {!selectedCategory && (
        <View style={styles.categoriesGrid}>
          {categoriesWithImages.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              onSelect={setSelectedCategory}
            />
          ))}
        </View>
      )}

      {/* Back button when category is selected */}
      {selectedCategory && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity 
            onPress={() => setSelectedCategory(null)}
            style={styles.backButton}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color="white" 
              style={styles.backButtonIcon}
            />
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>
        {selectedCategory} Items
      </Text>
          
        </View>
      
       

      )}

      {/* Items List */}
      {selectedCategory && (
        <ScrollView 
          contentContainerStyle={styles.itemsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsGrid}>
            {filteredItems.map((item, index) => {
              const canRecycle = 
                city && cityData[city]
                  ? cityData[city].some(
                      (recyclableItem) =>
                        recyclableItem.name === item.name &&
                        recyclableItem.canRecycle
                    )
                  : false;

              return (
                <RecyclingItemCard
                  key={index}
                  item={item}
                  canRecycle={canRecycle}
                  onPress={() => setExpandedItem(item)} 
                />
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Expanded Item Modal */}
      {expandedItem && (
        <Modal 
          transparent={true}
          visible={!!expandedItem}
          onRequestClose={() => setExpandedItem(null)} 
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity 
                onPress={() => setExpandedItem(null)} 
                style={styles.closeButton}
              >
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
              <Image 
                source={{ uri: expandedItem.image || 'default_image_url' }} 
                style={styles.expandedItemImage}
                resizeMode="cover"
              />
              <Text style={styles.expandedItemName}>{expandedItem.name}</Text>
              <Text style={styles.expandedItemDescription}>{expandedItem.description}</Text>
              <Text style={styles.expandedItemRecycleStatus}>
                {canRecycle ? 'Can be recycled' : 'Cannot be recycled'}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButtonContainer: {
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#234E13',
    paddingHorizontal: 10,
    paddingVertical: normalize(5),
    borderRadius: 10,
  },
  backButtonIcon: { marginRight: 5 },
  backButtonText: { color: 'white' },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234E13',
    paddingVertical:normalize(20),
  },
  itemsScrollView: {
    paddingBottom: 30,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  expandedItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  expandedItemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234E13',
    marginTop: 10,
  },
  expandedItemDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  expandedItemRecycleStatus: {
    fontSize: 18,
    color: '#234E13',
    marginTop: 15,
  },
});

export default RecyclingList;

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryCard = ({ category, onSelect }) => {
  return (
    <TouchableOpacity 
      onPress={() => onSelect(category.name)}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: category.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>
            View all {category.name.toLowerCase()} items
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color="#666" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
    width: '48%', // To create a two-column layout
    marginHorizontal: '1%',  // For some spacing between cards
  },
  imageContainer: {
    aspectRatio: 4/3,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentContainer: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#234E13',
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default CategoryCard;

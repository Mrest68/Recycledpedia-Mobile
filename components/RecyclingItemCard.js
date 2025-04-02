import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Modal, 
  StyleSheet 
} from 'react-native';
import { normalize } from '../components/normalize';

const RecyclingItemCard = ({ item, canRecycle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(item.image);

console.log(item.Image)
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Text style={[
          styles.badge, 
          canRecycle ? styles.acceptedBadge : styles.avoidBadge
        ]}>
          {canRecycle ? 'Accepted' : 'Avoid'}
        </Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image
          source={{ uri: item.image }} 
          style={styles.itemImage}
          resizeMode="cover"
        /> 
        </View>
        
       
      </View>

      {/* Expand Button */}
      <TouchableOpacity onPress={handleExpand} style={styles.expandButton}>
        <Text style={styles.expandButtonText}>
          {isExpanded ? 'Close' : 'View More'}
        </Text>
      </TouchableOpacity>

      {/* Modal for Expanded View */}
      {isExpanded && (
        <Modal
          transparent={true}
          visible={isExpanded}
          onRequestClose={handleExpand}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleExpand} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: item.image || 'https://via.placeholder.com/400' }} // Larger view of the image
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalItemName}>{item.name}</Text>
              <Text style={styles.modalItemDescription}>{item.description}</Text>
              <Text style={[styles.modalItemStatus, canRecycle ? styles.acceptedBadge : styles.avoidBadge]}>
                {canRecycle ? 'Can be Recycled' : 'Cannot be Recycled'}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: normalize(1),
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical:normalize(8,"Height"),
    elevation: normalize(2),
    position: 'relative',
    padding: normalize(30),
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    left: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: '600',
    borderWidth: 1,
  },
  acceptedBadge: {
    backgroundColor: '#DCF5E8',
    color: '#1A8A4C',
    borderColor: '#1A8A4C',
  },
  avoidBadge: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    borderColor: '#D32F2F',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: normalize(16),
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  expandButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#234E13',
    borderRadius: 8,
    alignItems: 'center',
  },
  expandButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  modalItemName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
  },
  modalItemDescription: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginVertical: 8,
  },
  modalItemStatus: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
});

export default RecyclingItemCard;

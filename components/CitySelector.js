import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CitySelector = ({ onCityChange }) => {
  const cities = [
    'Aventura',
    'Bal Harbour',
    'Bay Harbor Islands',
    'Biscayne Park',
    'Coral Gables',
    'Cutler Bay',
    'Doral',
    'El Portal',
    'Florida City',
    'Golden Beach',
    'Hialeah',
    'Hialeah Gardens',
    'Homestead',
    'Indian Creek',
    'Key Biscayne',
    'Medley',
    'Miami',
    'Miami Beach',
    'Miami Gardens',
    'Miami Lakes',
    'Miami Shores',
    'Miami Springs',
    'North Bay Village',
    'North Miami',
    'North Miami Beach',
    'Opa-Locka',
    'Palmetto Bay',
    'Pinecrest',
    'South Miami',
    'Sunny Isles Beach',
    'Surfside',
    'Sweetwater',
    'Virginia Gardens',
    'West Miami',
    'Unincorporated Dade',
  ];

  return (
    <View style={styles.pickerContainer}>
      <Picker
        onValueChange={(itemValue) => onCityChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item 
          label="Select a municipality" 
          value="" 
          color="#888" 
        />
        {cities.map((city) => (
          <Picker.Item 
            key={city} 
            label={city} 
            value={city} 
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = {
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
};

export default CitySelector;
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 375;

const calcFont = (percent) => {
  const scaleFactor = width / baseWidth;
  return Math.round(scaleFactor * percent);
};

const Custombar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                size: calcFont(34),
                color: isFocused ? 'green' : 'gray',
              })
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',   
        paddingBottom:'7%',     
        bottom:0,
        height:'10%',
        width:'100%',
        backgroundColor: 'white',    
        flexDirection: 'row',         
        alignItems: 'center',         
        justifyContent: 'space-around',
        borderTopColor: 'blue',       
        elevation: 5, 

      },
     
});
  export default Custombar;


import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './tabs/Home.js';
import About from './tabs/About.js';
import Learn from './tabs/Learn.js';
import Curbside from './tabs/Curbside.js';
import Items from './tabs/Items.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Custombar from './Custombar.js';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
const Tab = createBottomTabNavigator();

function Tabnav() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Custombar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen 
        name="About" 
        component={About} 
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="contact-support" size={size} color={color} />,
          tabBarLabel: 'About',
        }}
      />
      <Tab.Screen 
        name="Learn" 
        component={Learn} 
        options={{
          tabBarIcon: ({ size, color }) => <Entypo name="open-book" size={size} color={color} />,
          tabBarLabel: 'Learn',
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ size, color }) => <Icon name='home' size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Curbside" 
        component={Curbside} 
        options={{
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="dump-truck" size={size} color={color} />,
          tabBarLabel: 'Curbside',
        }}
      />
      <Tab.Screen 
        name="Items" 
        component={Items} 
        options={{
          tabBarIcon: ({ size, color }) => <Fontisto name="recycle" size={size} color={color} />,
          tabBarLabel: 'Items',
        }}
      />
    </Tab.Navigator>
  );
}


export default Tabnav;

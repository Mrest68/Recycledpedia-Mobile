import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView,Linking } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
;

const baseDimension = { 'baseHeight': 675, 'baseWidth': 375 };


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isLargeScreen = width > 400;
const textSizeFactor = isLargeScreen ? 1.1 : 1;

function calcHeight(size) {
  const scaleFactor = baseDimension.baseHeight / height;
  return size * scaleFactor;
}

function calcWidth(size) {
  const scaleFactor = baseDimension.baseWidth / width;
  return size * scaleFactor;
}


export default function About() {
  const openURL = (url)=>{
    Linking.openURL(url).catch((err)=>console.error("Failed to open",err))
  };
  const [num,setNum] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setNum(prevNum => parseFloat((prevNum + 318.5).toFixed(1))); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []); 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.boxTop}>
        <Text style={styles.textTop}>Our Story</Text>
        <Text style={styles.paragraphText}>
          Since 2006, Dream in Green (DIG) has empowered individuals, particularly youth, to lead the response to climate change and environmental challenges in South Florida. Through partnerships with schools, households, local governments, and businesses, we focus on reducing environmental footprints. By developing and overseeing educational programs and workshops, we promote sustainable behaviors across all age groups, with a special emphasis on K-12 students.
        </Text>
        <View style={styles.socialIconContainer}>
          <TouchableOpacity onPress={()=>openURL('https://www.linkedin.com/company/dream-in-green/')}>
            <Entypo  style={styles.socialIcons} name="linkedin" size={24} color="#234E13" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>openURL('https://www.facebook.com/dreamingreen')}>
            <Entypo  style={styles.socialIcons} name="facebook" size={24} color="#234E13" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>openURL('https://www.instagram.com/dreamingreenmia/')}>
            <Entypo  style={styles.socialIcons} name="instagram" size={24} color="#234E13" />
          </TouchableOpacity>            
          <TouchableOpacity onPress={()=>openURL('https://www.youtube.com/channel/UCn5Z3T2ejG4dYEJhe9ezLww')}>
            <Entypo  style={styles.socialIcons} name="youtube" size={24} color="#234E13" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>openURL('https://x.com/Dream_in_Green')}>            
          <FontAwesome6 name="x-twitter" size={24} color="#234E13" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boxMiddle}>
        <Text style={styles.textTop}>Our Mission</Text>
        <Text style={styles.paragraphText}>
          One of the major obstacles to effective recycling is contamination—when non-recyclable items are mistakenly placed into recycling systems. Our mission is to provide residents with clear, accessible, and up-to-date recycling information tailored to their specific community. By reducing contamination, we aim to improve recycling rates and help transform waste into valuable resources.
        </Text>
  

      <View style={styles.funFactRow}>
       <Text style={styles.funFactNum}>
        {num} 
       </Text>
       <Text style={{fontStyle:'italic'}}>
         tons of waste
       </Text>
       </View>
       
       <Text style={styles.funFact}>
          Note:
          "Did you know the world generates over 2.01 billion tons of waste each year? That is 318.5 tons of waste every 5 seconds."
        </Text>
      </View>

      <View style={styles.boxMiddle}>
        <Text style={styles.textTop}>Our Solution</Text>
        <Text style={styles.paragraphText}>
          Recyclepedia is designed to simplify access to accurate recycling information for Miami-Dade County residents. By providing comprehensive guidance on what can and cannot be recycled, Recyclepedia helps reduce contamination and improve recycling success. The platform offers alternatives for disposing of non-recyclable items, directing users to appropriate drop-off locations. By increasing recycling rates, we can reduce pollution and enhance the overall health of our communities.
        </Text>
        <TouchableOpacity style={styles.button2} onPress={()=>openURL('https://dreamingreen.org/about-us/')}>
          <Text style={styles.buttonText2}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  
    paddingBottom: calcHeight(20),
    backgroundColor: '#FFFF'  
  },
  socialIconContainer: {
    flexDirection: "row",
    justifyContent: 'center', // Centers the social icons horizontally
    marginTop: calcHeight(20),
  },
  socialIcons: {
    marginHorizontal: calcWidth(15),
  },
  boxTop:{
    backgroundColor: '#FFF',
    justifyContent: 'center',  
    alignItems: 'center',  
    borderBottomWidth: calcWidth(1),
    borderBottomColor: "#a9def9",
    paddingHorizontal: calcWidth(10),
    paddingTop: calcHeight(110),
    paddingBottom: calcHeight(20)
  },
  boxMiddle: {
    padding:calcHeight(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',  
    alignItems: 'center',  
    borderBottomWidth: calcWidth(1),
    borderBottomColor: "#a9def9",
    paddingHorizontal: calcWidth(10), 
    paddingBottom: calcHeight(30),
  },
  textTop: { 
    fontSize: calcWidth(26) * textSizeFactor,
    color: '#234E13',
    textAlign: 'center',
  },
  paragraphText: { 
    fontSize: calcWidth(13) * textSizeFactor,
    color: 'black',
    textAlign: 'center',
    marginTop: calcHeight(15),
    marginHorizontal: calcWidth(10),
    lineHeight: calcHeight(25),  // Small margin for readability
  },
  funFactRow:{
    flexDirection:'row',
    padding:calcHeight(15),
    alignItems: 'center',
    
  },
  funFact:{
    marginTop: calcHeight(5),
    fontSize: calcWidth(12) * textSizeFactor,
  },
  funFactNum:{
    fontSize: calcWidth(20) * textSizeFactor,
    fontWeight:'bold',
    marginHorizontal:calcWidth(10),
    color:'#234E13',

  },
  button2: {
    backgroundColor: '#234E13',
    paddingVertical: calcHeight(10),
    paddingHorizontal: calcWidth(40),
    borderRadius: 5,
    marginTop: calcHeight(15),
  },
  buttonText2: {
    color: 'white',
    textAlign: 'center',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: calcHeight(15),
  },
  photo: {
    width: calcWidth(50),
    height: calcHeight(50),
    borderRadius: 5,
  },
});

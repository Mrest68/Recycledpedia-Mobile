import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LearnGame from '../learncomps/LearnGame';
import LearnGameImageOne from '../../assets/LearningGameOne.png';
import FeaturedGame from "../learncomps/FeaturedGame";
import FeatureGameImage from "../../assets/FeatureGameImage.png"
import cartoon from '../../assets/cartons.png'
import toter from '../../assets/toter.png'
const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const referenceHeight = 812;

const calcFont = (percent) => {
    const scale = width / baseWidth;
    return Math.round(percent * scale);
};

const calcHeight = (size) => {
    const scaleFactor = height / referenceHeight;
    return Math.round(size * scaleFactor);
};

const Learn = () => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.learnHeader}>Learn</Text>
                <FeaturedGame image={FeatureGameImage} title={"sample game"} />
                
                <View style={styles.scrollContainer}>
                    <Text style={styles.scrollContainerHeader}> More Games</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.rowContentContainer}
                    >          
                         <LearnGame image={toter} title={"sample game"} color={"#a9def9"} url={"https://www.coolmathgames.com/0-appel"}/>
                        <LearnGame image={cartoon} title={"sample game"} color={"#234E13"} url={"https://www.coolmathgames.com/0-suika-watermelon-game"}/>
                        <LearnGame image={toter} title={"sample game"} color={"#a9def9"} url={"https://www.coolmathgames.com/0-jelly-escape"}/>
                        <LearnGame image={LearnGameImageOne} title={"sample game"} color={"#DBF4D2"} url={"https://www.coolmathgames.com/0-cube-connect"}/>
                    </ScrollView>
                </View>
                
                <View style={styles.scrollContainer}>
                <Text style={styles.scrollContainerHeader}> Articles</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.rowContentContainer}
                    >
                        <LearnGame image={LearnGameImageOne} title={"sample article"} color={"#234E13"}/>
                        <LearnGame image={LearnGameImageOne} title={"sample article"} color={"#DBF4D2"}/>
                        <LearnGame image={LearnGameImageOne} title={"sample article"} color={"#a9def9"}/>
                        <LearnGame image={LearnGameImageOne} title={"sample article"} color={"#234E13"}/>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: calcHeight(20),
    },
    container: {
        paddingTop: calcHeight(5),  
    },
    learnHeader: {
        fontSize: calcFont(40),
        textAlign: 'left',
        marginBottom: 10,
        marginTop: calcHeight(30),
        marginLeft:calcFont(30),  
    },
    scrollContainerHeader:{
        textAlign:"center",
        fontSize:(30),
        paddingBottom:calcHeight(5),
    },
    scrollContainer: {
        height: calcHeight(200), 
        marginVertical: calcHeight(2),
    },
    rowContentContainer: {
        paddingHorizontal: 5,
    },
});

export default Learn;

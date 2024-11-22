import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LearnGame from '../learncomps/LearnGame';
import LearnGameImageOne from '../../assets/LearningGameOne.png';
import LearnGameImageTwo from '../../assets/LearnGameImageTwo.png';
import FeaturedGame from "../learncomps/FeaturedGame";
import FeatureGameImage from "../../assets/Diggy.png"
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
                <FeaturedGame image={FeatureGameImage} title={"Diggy Recycling Game"} />
                
                <View style={styles.scrollContainer}>
                    <Text style={styles.scrollContainerHeader}> More Games</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.rowContentContainer}
                    >          
                         <LearnGame image={toter} title={"Recycle Round Up"} color={"#a9def9"} url={"https://kids.nationalgeographic.com/games/action-adventure/article/recycle-roundup-new"}/>
                        <LearnGame image={cartoon} title={"Litter Critter"} color={"#234E13"} url={"https://www.abcya.com/games/recycling_game"}/>
                        <LearnGame image={LearnGameImageTwo} title={"Recycle or Not"} color={"#a9def9"} url={"https://www.recycleornot.org/"}/>
                        <LearnGame image={require('../../assets/Mountain.png')} title={"Recycling Waste"} color={"#DBF4D2"} url={"https://www.turtlediary.com/game/recycling-waste.html"}/>
                    </ScrollView>
                </View>
                
                <View style={styles.scrollContainer}>
                <Text style={styles.scrollContainerHeader}> Articles</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.rowContentContainer}
                    >
                        <LearnGame image={require('../../assets/DoodoEarth.png')} title={"sample article"} color={"#234E13"} url={"https://dreamingreen.org/design-build-competition-high-school-students-design-for-the-future/"}/>
                        <LearnGame image={require('../../assets/cloud.png')} title={"sample article"} color={"#DBF4D2"} url={"https://dreamingreen.org/miami-environmental-education-activist-seeks-solutions-at-worldwide-climate-change-conference/"}/>
                        <LearnGame image={require('../../assets/FeatureGameImage.png')} title={"sample article"} color={"#a9def9"} url={"https://www.miamidade.gov/global/service.page?Mduid_service=ser1494966732017925"}/>
                        <LearnGame image={require('../../assets/1.png')} title={"sample article"} color={"#234E13"} url={"https://www.waste360.com/waste-recycling/miami-dade-county-introduces-fees-for-unresolved-contamination-in-resident-s-recycling-bins"}/>
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
        color:'#6ad04b',

 
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

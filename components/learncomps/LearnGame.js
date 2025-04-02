import React from "react";
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const referenceHeight = 812;

const calcHeight = (size) => {
    const scaleFactor = height / referenceHeight;
    return Math.round(size * scaleFactor);
};
const calcFont = (percent) => {
    const scale = width / baseWidth;
    return Math.round(percent * scale);
};

const LearnGame = ({ image, url, title, color }) => {
    const openURL = () => {
        Linking.openURL(url);
    };

    return (
        <View style={[styles.imageContainer, { backgroundColor: color || '#f0f0f0' }]}>
            <Image
                source={image}
                style={styles.learnGameImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.button} onPress={openURL}>
                    <Icon name="play-arrow" size={calcFont(20)} color="#d3d3d3" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: width * 0.45,
        height: calcHeight(160),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 0,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    learnGameImage: {
        width: '58%',
        height: '58%',
        resizeMode: 'contain',
        marginBottom:calcHeight(40),

    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 6,
        right: 6,
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: calcFont(12),
        fontWeight: '600',
        color: '#000',
        left:5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        right:5,
    },
   
});

export default LearnGame;

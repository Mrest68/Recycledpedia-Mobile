import React from "react";
import {View, Text,StyleSheet} from 'react-native';
export default function Curbside(){
    return(
        <View style={styles.container}> 
            <Text style={styles.text}>
                Curbside
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        textAlign:'center',
        position:'absolute',
        top:'50%',
        fontSize:'50%'
    },
})
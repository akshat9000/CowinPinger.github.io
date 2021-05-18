import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

function Title(props) {
    return (
        <View style={styles.container}>

            <Image 
            	style={{width:100, height:100, marginBottom:15}}
            	source={require("../assets/logo.png")}
            />
            <Text style={styles.text}>
                CoWin Slot Pinger
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontWeight: "bold",
        margin: 10,
        fontSize: 25
    },
})


export default Title;
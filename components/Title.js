import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

function Title(props) {
    return (
        <View style={styles.container}>
            <AntDesign name="slack" size={44} color="black" />
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
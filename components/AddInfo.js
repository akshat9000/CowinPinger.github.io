import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function AddInfo(props) {
    // console.log('In add')
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, textAlign: "center"}}>
                You don't have any Jobs scheduled. Press the {<AntDesign name="plussquareo" size={25} color="black" /> } button to go back and add new jobs.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "dodgerblue",
        padding: 10,
        paddingHorizontal: 15
    }
})

export default AddInfo;
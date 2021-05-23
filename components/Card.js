import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

function Card({ type, setModal, value }) {
    return (
        <View style={styles.container}>
            <View style={styles.stateContainer}>
                <Text>
                    {type}
                </Text>
            </View>
            <TouchableHighlight
                onPress={() => setModal(true)}
                style={styles.pickerContainer}
                underlayColor="#005A9C"
                activeOpacity={0.8}
            >
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{alignContent: "center"}}>{value}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ededed",
        width: "90%",
        height: "20%",
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        // justifyContent: "center"
    },
    pickerContainer: {
        backgroundColor: "white",
        width: "80%",
        height: "40%",
        margin: 12,
        borderRadius: 5,
        justifyContent: "center"
    },
    stateContainer: {
        width: "100%",
        height: "40%",
        backgroundColor: "#1e90ff",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Card;
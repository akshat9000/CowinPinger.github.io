import React from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

function ListItem({ name, onPress }) {
    return (

        <TouchableHighlight
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.item}>
                <Text>{name}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ListItem;
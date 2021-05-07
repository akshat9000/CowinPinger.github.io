import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

function BasicContainer({ children }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: "white",
        width: '80%',
        height: '90%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight
    }
})

export default BasicContainer;
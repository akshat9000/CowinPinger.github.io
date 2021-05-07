import React from 'react';
import { StyleSheet, View } from 'react-native';

import BasicContainer from "./BasicContainer"
import Title from "./Title"
import Info from "./Info"

function Screen1({ onPress }) {
    return (
        <View style={styles.container}>
            <BasicContainer>
                <Title />
                <Info 
                    onPress={onPress}
                />
            </BasicContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e3e3e3',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Screen1;
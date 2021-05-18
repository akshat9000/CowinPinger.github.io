import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';

function Info() {

    const navigation = useNavigation()

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Please Read
                </Text>
                <View style={styles.para}>
                    <Text style={styles.text}>
                        Using this App, you can set an automatic alert system for your preferred district
                    </Text>
                    <Text style={styles.text}>
                        This app uses the open CoWin API, so the App data might vary from actual data
                    </Text>
                    <Text style={styles.text}>
                        The script checks the CoWin API every 1 minute
                    </Text>
                    <Text style={styles.text}>
                        Please suggest a better name for this app to the devs, if you have one, via twitter @Akshat_Srivastava
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    activeOpacity={0.8}
                    underlayColor="#005A9C"
                    onPress={() => navigation.navigate('screen2')}
                    style={styles.buttonView}
                >
                    <View >
                        <Text
                            style={{
                                fontWeight: "bold"
                            }}
                        >CONTINUE</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        padding: 10,
        alignItems: "center",
        width: "100%",
    },
    buttonView: {
        alignItems: "center",
        backgroundColor: "#1e90ff",
        padding: 5,
        borderRadius: 15,
        // flex: 1
    },
    button:{
        width: "50%"
    },
    container:{
        width: "100%",
        height: "60%",
        alignItems: "center"
    },
    heading:{
        marginTop: 3,
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 18,
        textAlign: "center"
    },
    para:{
        margin: 0,
        padding: 30,
        justifyContent: "center"
    },
    text:{
        margin: 2,
        padding: 7,
        textAlign: "center"
    }
})

export default Info;
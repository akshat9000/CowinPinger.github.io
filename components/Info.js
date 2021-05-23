import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

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
                        The script checks the CoWin API every 1 minute
                    </Text>
                    <Text style={styles.text}>
                        If the notifications are too frequent, you can always go and delete the scheduled job
                    </Text>
                    <Text style={styles.text2}>
                        NOTE: This app works like a music player. If you kill the app, the notifications will stop. Just push the app into the background (i.e. switch to another app or the homescreen) and the notifications will continue
                    </Text>
                    <Text style={styles.text}>
                        Please suggest a better name for the app, or raise any issues to the dev via email - vaxslots.dev@gmail.com
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
        // padding: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: "center",
        // backgroundColor: "red"
    },
    text:{
        // marginBottom: 2,
        marginBottom: 2,
        // paddingBottom: 7,
        paddingBottom: 7,
        textAlign: "center"
    },
    text2:{
        // marginBottom: 2,
        marginBottom: 2,
        // paddingBottom: 7,
        paddingBottom: 7,
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default Info;
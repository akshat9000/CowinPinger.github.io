import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { unRegister } from "../config/Functions"
import { useNavigation } from '@react-navigation/native';

function JobItem({ state, name, age, distId, toggle, setToggle }) {
    
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.details}>
                    <View style={styles.state}>
                        <Text style={{fontWeight: "bold", fontSize: 20, paddingHorizontal: 10}} numberOfLines={1}>{state}</Text>
                    </View>
                    <View style={styles.stateDeets}>
                        <View>
                            <Text numberOfLines={1} style={{paddingHorizontal: 10}}>District - {name}</Text>
                        </View>
                        <View>
                            <Text>Age - {age === "45" ? "45+" : "18-45"}</Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight 
                    style={styles.delete}
                    onPress={() => {
                        unRegister(distId, age, name)
                        setToggle(!toggle)
                        navigation.navigate('screen3')
                        }}
                    activeOpacity={0.8}
                    underlayColor="#005A9C"
                >
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <AntDesign name="delete" size={24} color="black" />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ededed",
        width: "90%",
        height: 80,
        margin: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center", 
    },
    delete:{
        width: "20%",
        height: "100%",
        backgroundColor: "dodgerblue",
        justifyContent: "center", 
        alignItems: "center"
    },
    detailsContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },
    details: {
        height: "100%",
        width: "80%",
    },
    state: {
        width: "100%", 
        height: "50%", 
        justifyContent: "center", 
        alignItems: "center"
    },
    stateDeets: {
        width: "100%", 
        height: "25%", 
        justifyContent: "center", 
        alignItems: "center",
        marginBottom: 0
    }
})

export default JobItem;
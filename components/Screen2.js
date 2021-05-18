import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, FlatList, Button, TouchableHighlight, Alert, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

import BasicContainer from "./BasicContainer"
import Card from "./Card"
import ListItem from "./ListItem"
import { addNewJob } from "../config/Functions"


let data1 = require('../config/States')
let states = data1.states

let data2 = require('../config/Districts')
let districts = data2.districts

const anonymous = async () => {
    if(Constants.isDevice){
        const { status : existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== 'granted'){
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert("Permissions not granted","failed to get push token for push notifs",[{text: "ok"}])
            return;
        }
    } else {
        alert("Must be a mobile device!")
    }
}

function Screen2(props) {

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            };
        },
    });

    useEffect(() => {
        // TaskManager.unregisterAllTasksAsync()
        // AsyncStorage.clear()
        // checkToken()
        anonymous()
    },[])
    
    const navigation = useNavigation()
    // const [pushToken, setPushToken] = useState('');
    const [stateModal, setStateModal] = useState(false);
    const [distModal, setDistModal] = useState(false);
    const [chooseState, setChooseState] = useState("Select a State");
    const [stateId, setStateId] = useState("0");
    const [chooseDist, setChooseDist] = useState("Select a District");
    const [distList, setDistList] = useState([])
    const [distId, setDistId] = useState("0")
    const [ageModal, setAgeModal] = useState(false)
    const [age, setAge] = useState("Select Age Bracket")
    // const []

    const ageBracket = [{age: "18-45"},{age: "45+"}]


    const onPress = (name) => {
        console.log(name)
    }

    return (
        <>
            <View style={styles.container}>
                <BasicContainer>
                    <Card 
                        type="STATE" 
                        setModal={setStateModal}
                        value={chooseState}
                    />  
                    <Card 
                        type="DISTRICT" 
                        setModal={setDistModal}
                        value={chooseDist}
                    /> 
                    <Card 
                        type="AGE BRACKET" 
                        setModal={setAgeModal}
                        value={age}
                    />   
                    <View style={{
                            flexDirection:"row",
                            position: "absolute",
                            bottom: 20
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "dodgerblue",
                                width: 100,
                                height: "110%",
                                borderRadius: 30,
                                marginHorizontal:10
                            }}>
                            <TouchableHighlight
                                activeOpacity={0.8}
                                underlayColor="#005A9C"
                                onPress={() => {
                                    addNewJob(chooseState,chooseDist,distId,age)
                                    }}
                                style={{
                                    // marginHorizontal: 10
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                                    <Text>Add </Text>
                                    <AntDesign name="plussquareo" size={40} color="black" />     
                                </View>
                                </TouchableHighlight>  
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "dodgerblue",
                                width: 100,
                                height: "110%",
                                borderRadius: 30,
                                marginHorizontal:10
                            }}>
                            <TouchableHighlight
                                activeOpacity={0.8}
                                underlayColor="#005A9C"
                                onPress={() => {
                                    navigation.navigate('screen3')
                                    }}
                                style={{
                                    // marginHorizontal:10,
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                                    <AntDesign name="checksquareo" size={40} color="black" />   
                                    <Text> Done</Text>
                                </View>
                            </TouchableHighlight>                         
                        </View>
                    </View>   
                </BasicContainer>
            </View>
            <Modal visible={stateModal} animationType="slide">
                <Button 
                    title="Select a State"
                />
                <FlatList 
                    data={states}
                    keyExtractor={item => item.state_id}
                    renderItem={({item}) => <ListItem 
                        name={item.name}
                        onPress={() => {
                            setChooseState(item.name)
                            setStateId(item.state_id)
                            // console.log(stateId)
                            setStateModal(false)
                            const res = districts.filter(dist => dist.state_id === item.state_id)
                            // console.log(res[0].districts)
                            setDistList(res[0].districts)
                        }}
                    />}
                />
            </Modal>
            <Modal visible={distModal} animationType="slide">
                <Button 
                    title="Select a District"
                />
                <FlatList 
                    data={distList}
                    keyExtractor={item => item.district_id}
                    renderItem={({item}) => <ListItem 
                        name={item.name}
                        onPress={() => {
                            setChooseDist(item.name)
                            setDistId(item.district_id)
                            setDistModal(false)
                        }}
                    />}
                />
            </Modal>
            <Modal visible={ageModal} animationType="slide">
                <Button 
                    title="Select your age bracket"
                />
                <FlatList 
                    data={ageBracket}
                    keyExtractor={item => item.age}
                    renderItem={({item}) => <ListItem 
                        name={item.age}
                        onPress={() => {
                            setAge(item.age)
                            setAgeModal(false)
                        }}
                    />}
                />
            </Modal>
        </>
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

export default Screen2;
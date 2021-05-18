import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as TaskManager from "expo-task-manager"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

import BasicContainer from "./BasicContainer"
import Card from "./Card"
import ListItem from "./ListItem"
import { addNewJob } from "../config/Functions"
const axios = require('axios')

let data1 = require('../config/States')
let states = data1.states

let data2 = require('../config/Districts')
let districts = data2.districts

async function registerForPushNOtifications() {
    let token;
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        // {setToken && setToken(token)}
        // const key = "pushToken"
        try {
            await AsyncStorage.setItem("pushToken", token)
        } catch (e) {
            console.log("Error in storing token", e)
        }
    } else {
        alert("Must be a physical Device!")
    }
}

async function checkToken(token) {
    try {
        const token = await AsyncStorage.getItem("pushToken")
        if(token === null) {
            console.log("token does not exists")
            registerForPushNOtifications()
        } else {
            console.log(token)
        }
    } catch (err) {
        console.log("checkToken ",err)
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
        TaskManager.unregisterAllTasksAsync()
        AsyncStorage.clear()
        checkToken()
    },[])
    
    const navigation = useNavigation()
    const [pushToken, setPushToken] = useState('');
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
                        <TouchableHighlight
                            activeOpacity={0.8}
                            underlayColor="#005A9C"
                            onPress={() => {
                                addNewJob(chooseState,chooseDist,distId,age)
                                }}
                            style={{
                                marginHorizontal: 20
                            }}
                        >
                            <AntDesign name="plussquareo" size={40} color="dodgerblue" />        
                        </TouchableHighlight>  
                        <TouchableHighlight
                            activeOpacity={0.8}
                            underlayColor="#005A9C"
                            onPress={() => {
                                navigation.navigate('screen3')
                                }}
                            style={{
                                marginHorizontal:20
                            }}
                        >
                            <AntDesign name="checksquareo" size={40} color="dodgerblue" />   
                        </TouchableHighlight>                         
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
                            // const res = districts.filter(dist => dist.state_id === item.state_id)
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
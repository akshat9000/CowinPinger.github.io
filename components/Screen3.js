import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableHighlight, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BasicContainer from "./BasicContainer"
import JobItem from "./JobItem"
import AddInfo from "./AddInfo"
import { useNavigation } from '@react-navigation/native';


const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      console.log(keys)
      return keys
    } catch(e) {
        // read key error
        console.log(e.message)
    }
}



function Screen3(props) {
    
    const [toggle, setToggle] = useState(true)
    const navigation = useNavigation()
    const [jobList, setJobList] = useState()
    const [showInfo, setShowInfo] = useState(false)
    
    const toggler = async () => {
        const keys = await AsyncStorage.getAllKeys()
        if(!keys.length){
            setShowInfo(true)
        }
    }
    const getKeys = async () =>{
        const keys = await getAllKeys()
            setShowInfo(false)
            const jobKeys = keys.filter(key => key.slice(0,3) === "JOB")
            // console.log(jobKeys)
            const list = []
            for (var i = 0; i <= jobKeys.length; ++i){
                const key = jobKeys[i]
                console.log(key)
                if(i === jobKeys.length){
                    setJobList(list)
                    // console.log(list)
                }
                else{
                    const job = {}
                    const storedJobString = await AsyncStorage.getItem(jobKeys[i])
                    const storedJob = JSON.parse(storedJobString)
                    job['state'] = storedJob['stName']
                    job['dist'] = storedJob['distId']
                    job['name'] = storedJob['distName']
                    job['key'] = "JOB "+storedJob['distId'] + "-" + storedJob['age']
                    job['age'] = storedJob['age']
                    list.push(job)
                }
            }
            console.log(list)
    }


    useEffect(() => {
        getKeys()
        toggler()
    },[toggle])
    
    return (
        <View style={styles.container}>
            <BasicContainer>
                <View style={{
                    backgroundColor: "dodgerblue",
                    width: "100%",
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>NOTIFICATIONS LIST</Text>
                </View>
                <View style={{
                    // position: "absolute",
                    marginTop: 20
                }}>{showInfo ? (<AddInfo />) : null}</View>
                <View style={{height: "75%"}}>
                    <FlatList 
                        persistentScrollbar
                        data={jobList}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => <JobItem 
                            state={item.state}
                            name={item.name}
                            age={item.age}
                            distId={item.dist}
                            toggle={toggle}
                            setToggle={setToggle}
                        />}
                    />
                </View>
                <View style={{position: "absolute", bottom: 30, width: "20%", height: "6%",justifyContent: "center", alignItems: "center"}}>
                    <TouchableHighlight
                        underlayColor="#005A9C"
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('screen2')}
                        style={{
                            backgroundColor: "dodgerblue",
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 30
                        }}
                    >
                        <AntDesign name="plussquareo" size={40} color="black" /> 
                    </TouchableHighlight>
                </View>
            </BasicContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e3e3e3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Screen3;
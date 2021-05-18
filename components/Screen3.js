import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
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
                <View>{showInfo ? (<AddInfo />) : null}</View>
                <View style={{height: "85%"}}>
                    <FlatList 
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
                <TouchableHighlight
                    underlayColor="#005A9C"
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('screen2')}
                    style={{position: "absolute", bottom: 30}}
                >
                    <AntDesign name="plussquareo" size={40} color="dodgerblue" /> 
                </TouchableHighlight>
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
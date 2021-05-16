import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableHighlight, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BasicContainer from "./BasicContainer"
import JobItem from "./JobItem"
import { useNavigation } from '@react-navigation/native';
import { getExpoPushTokenAsync } from 'expo-notifications';

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

const getJobKeys = async () => {
    try {
        const jobKeys = []
        const keys = await getAllKeys()
        jobKeys = keys.filter(key => key.slice(0,3).toString() === "JOB")
        return jobKeys
    } catch (e) {
        console.log("Error in getJobKeys: ", e.message)
    }
}

const getList = async () => {
    const list2 = await getJobKeys()
        .then(list => {return list.map(async (key) =>{
                try {
                    const job = {}
                    const jobJSON = await AsyncStorage.getItem(key)
                    const jobJSONTemp = JSON.parse(jobJSON)
                    job['state'] = jobJSONTemp['stName']
                    job['dist'] = jobJSONTemp['distId']
                    job['name'] = jobJSONTemp['distName']
                    return job
                } catch(e) {
                    console.log("useEffect -> map ", e.message)
                }
            })
        })
    // const list = list2.map(async (key) => {
    // })
    return list
}

function Screen3(props) {
    
    // const list = [{state:"maharashtra", dist: "395", name:"mumbai"},{state:"gujrat", dist: "396", name:"mumbai"},{state:"maharashtra", dist: "397", name:"mumbai"},{state:"gujrat", dist: "398", name:"mumbai"},{state:"maharashtra", dist: "399", name:"mumbai"},{state:"gujrat", dist: "400", name:"mumbai"},{state:"maharashtra", dist: "390", name:"mumbai"}]
    // const keyList = []
    // const list = []
    
    
    const navigation = useNavigation()
    
    const onPress = (dist_id) => {
        // EXECUTE DELETING LOGIC FOR BACKGROUND PROCESS
        const res = jobList.filter(item => item.dist !== dist_id)
        setJobList(res)
    }
    const [jobList, setJobList] = useState()
    
    useEffect(() => {
        const getKeys = async () =>{
            const keys = await getAllKeys()
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
                    // console.log(storedJob)
                    job['state'] = storedJob['stName']
                    job['dist'] = storedJob['distId']
                    job['name'] = storedJob['distName']
                    job['key'] = storedJob['distId'] + "-" + storedJob['age']
                    job['age'] = storedJob['age']
                    // console.log(job)
                    list.push(job)
                }
            }
            console.log(list)
        }
        getKeys()
        // getList()
        //     .then(list => this.useState(list))
    },[])
    
    return (
        <View style={styles.container}>
            <BasicContainer>
                <View style={{height: "85%"}}>
                    <FlatList 
                        data={jobList}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => <JobItem 
                            onPress={() => onPress(item.dist)}
                            state={item.state}
                            name={item.name}
                            age={item.age}
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
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

// var testData = require("./testData.json")
const axios = require('axios')
const sampleUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
// const appointmentsListLimit = 2

var jobNames = []     

const makeNewJob = async (stName="",distName="", distId="", age="") => {
    var newJob = {}
    try {
        newJob['distName'] = distName
        newJob['distId'] = distId.toString()
        newJob['age'] = age.toString()
        newJob['stName'] = stName
        return newJob
    } catch (e) {
        console.log('makeNewJob(): ',e)
        return -1
    }
}

const storeData = async (jobObj) => {
    try {
        const jsonValue = JSON.stringify(jobObj)
        const key = "JOB "+jobObj["distId"] + "-" + jobObj["age"]
        if(jobNames.indexOf(key) === -1) jobNames.push(key)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
      console.log('storeData(): ',e)
      return -1
    }
}

const getData = async (stName="", distName="", distId="", age="", todayDate="") => {
    try {
        // if age === "45+"
        const key = "JOB "+ distId.toString() + "-" + age.toString()
        if(jobNames.indexOf(key) === -1) jobNames.push(key)
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
        // value previously stored
            console.log('District already Added')
            return 0
        } else {
            // if not stored previously
            try {
                var newJob = await makeNewJob(stName,distName,distId,age)
                console.log(newJob)
                let res = await storeData(newJob)
                let res2 = await RegisterBackgroundTask(distId, todayDate, age)
                return 1
            } catch (e) {
                console.log('previously not stored: ',e)
                return -1
            }
        }
    } catch(e) {
      // error reading value
      console.log('getData(): ',e)
      return -1
    }
}
  

export const addNewJob = async (stName="",distName="", distId = "", age = "", todayDate="") => {
    let res = await getData(stName,distName, distId, age)
    if(res === -1) { 
        console.log('Check errors')
    } else {
        if(res === 0) {
            Alert.alert(
                "Job Already Exists",
                "You have already set a pinger for this district",
                [
                    {
                        text: "OK"
                    }
                ]
            )
        }
        else {
            Alert.alert(
                "Job Added!",
                "Job added successfully",
                [
                    {
                        text: "ok"
                    }
                ]
            )
        }
    }
}

// exports.addNewJob = addNewJob;

const getDate = async () => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()

    return date + '-' + month + '-' + year
}

const checkSlots = async (distId = "", todayDate = "", age = "") => {
    // const baseURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="
    // const id = distId.toString()
    // const today = todayDate.toString()
    // var afterURL = id + "&date=" + today
    // const fetchURL = baseURL + afterURL
    console.log('Check Slots')
    const fetchURL = "http://192.168.0.109:5000/"
    // const fetchURL = "http://127.0.0.1:5000/"
    // const fetchURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=14-05-2021"
    // console.log(testData)
    const age2 = 45
    try {
        // pingCowin(fetchURL)
        axios.get(fetchURL, {headers: {'User-Agent': sampleUserAgent}}).then((result) => {
            console.log("Axios get")
            const { centers } = result.data;
            // let isSlotAvailable = false;
            let dataOfSlot = "";
            let appointmentAvailableCount = 0;
            if (centers.length) {
                centers.forEach(center => {
                    center.sessions.forEach((session => {
                        if (session.min_age_limit <= 45 && session.available_capacity >= 0) {
                            // IMPLEMENT PUSH NOTIF LOGIC
                            dataOfSlot = `Hospital Name: ${center.name}\nPincode: ${center.pincode}\nSlots Available: ${session.available_capacity}`
                            console.log(dataOfSlot)
                        }
                    }))
                });
            } else {
                console.log("no centers")
            }
        }).catch((err) => {
            console.log("Error: "+err.message);
        })
        
    } catch (e) {
        console.log('Fetching failed, tried at: ',fetchURL)
        console.log(e)
    }
}
const noname = (distId = "", todayDate = "", age = "") => {
    console.log('noname -> defineTask')
    const nyName = jobNames[jobNames.length - 1]
    TaskManager.defineTask(jobNames[jobNames.length -1].toString(), async (distId, todayDate, age) => {
        console.log('defineTask')
        try {
            console.log(nyName)
            await checkSlots(distId, todayDate, age)
            console.log("checking slots")
        } catch (err) {
            console.log("noname error block", err)
            return BackgroundFetch.Result.Failed
        }
    })
}



const RegisterBackgroundTask = async (distId = "", todayDate = "", age = "") => {
    console.log('RegisterBackgroundTask...')
    try {
        noname(distId, todayDate, age)
        await BackgroundFetch.registerTaskAsync(jobNames[jobNames.length - 1].toString(), {
        minimumInterval: 1, // seconds,
      })
      console.log("Task registered")
    } catch (err) {
      console.log("Task Register failed:", err)
    }
}
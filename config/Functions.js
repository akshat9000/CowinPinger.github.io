import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import axios from 'axios'; 
import { scheduleNotificationAsync } from 'expo-notifications';

const sampleUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
var jobNames = []

export const addNewJob = async (stName="",distName="", distId = "", age = "", todayDate="") => {
    // COMBINES FUNCTIONALITY OF GETTING DATA AND STORING DATA
    age = age.slice(0,2) // if age === "18-45" returns 18. else if age === "45+", returns 45
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
                "Job added successfully!\n\nYou can either push app to background or add more jobs!\n\nNOTE: You will get notifications only when the app is in the background",
                [
                    {
                        text: "ok",
                    }
                ]
            )
        }
    }
}

const makeNewJob = async (stName="",distName="", distId="", age="") => {
    // MAKES A NEW JOB OBJECT
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
    // STORES JOB OBJECT INTO ASYNCSTORAGE AS JSON STRING
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
    // CHECKS IF GIVEN JOB EXISTS OR NOT. IF NOT, IT ADDS IT TO THE JOB LIST. ELSE, NOTIFIES EXISTENCE
    try {
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
  


const getDate = async () => {
    // RETURNS THE CURRENT DATE IN STRING FORMAT
    var date = ("0" + new Date().getDate()).slice(-2)
    var month = ("0" + (new Date().getMonth() + 1)).slice(-2)
    var year = new Date().getFullYear()
    return (date + '-' + month + '-' + year).toString()
}

const checkSlots = async (distId = "", todayDate = "", age) => {
    const today = await getDate()
    // const fetchURL = "http://192.168.0.109:5000/" // TESTING SERVER
    const fetchURL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distId}&date=${today}` // PRODUCTION SERVER
    // console.log("***********Fetching at : ",fetchURL)
    try {
        const lowerLimit = (age === "18") ? 18 : 45
        const upperLimit = (age === "18") ? 45 : 150 // required to check age range
        axios.get(fetchURL, {headers: {'User-Agent': sampleUserAgent}}).then((result) => {
            const { centers } = result.data;
            let dataOfSlot = "";
            if (centers.length) {
                centers.forEach(center => {
                    center.sessions.forEach((session => {
                        // console.log(session)
                        if (session.min_age_limit >= lowerLimit && session.min_age_limit < upperLimit && session.available_capacity > 0) {
                            dataOfSlot = `Hospital Name: ${center.name}\nPincode: ${center.pincode}\nSlots Available: ${session.available_capacity}\nDate: ${session.date}\nMin age limit: ${session.min_age_limit}\nVAccine: ${session.vaccine}`
                            // sendNotif(dataOfSlot) 
                            localNotif(dataOfSlot) 
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
        console.log(e)
    }
}

const someName = async (distId, todayDate, age) => {
    // FUNCTION WRAPPER FOR CHECKSLOTS FUNCTION
    try {
        await checkSlots(distId, todayDate, age)
    } catch (err) {
        console.log("noname error block", err)
        return BackgroundFetch.Result.Failed
    }
}

const noname = (distId, todayDate, age) => {
    // FUNCTION WRAPPER USED TO REGISTER TASK WITH TASK MANAGER
    const nyName = jobNames[jobNames.length - 1]
    TaskManager.defineTask(jobNames[jobNames.length -1].toString(),() => {
        someName(distId, todayDate, age)
    })
}

const RegisterBackgroundTask = async (distId, todayDate, age) => {
    // REGISTERS A BACKGROUND TASK WITH THE TASK MANAGER. ALSO SPECIFIES THE CHECKING FREQUENCY
    try {
        noname(distId, todayDate, age)
        await BackgroundFetch.registerTaskAsync(jobNames[jobNames.length - 1].toString(), {
            minimumInterval: 30, // seconds,
      })
    } catch (err) {
        console.log("Task Register failed:", err)
    }
}

const localNotif = async (data) => {
    const content = {
        body: data,
        title: "Slot Available!"
    }
    scheduleNotificationAsync({ content, trigger: null });
}

export const unRegister = async (distId, age, name) => {
    //UNREGISTERs A BACKGROUND TASK FROM BACKGROUNDFETCH
    const ageBracket = (age === "18") ? "18-45" : "45+"
    try{
        const key = `JOB ${distId}-${age}`
        try{
            const remove = await AsyncStorage.removeItem(key)
            // const letsee = await AsyncStorage.getAllKeys().then(res => console.log(res))
        } catch(e){
            console.log('key removal error',e.message)
        }
        BackgroundFetch.unregisterTaskAsync(key)
            .then(res => {
                console.log(res)
                const id = jobNames.indexOf(key)
                if (id > -1) jobNames.splice(id, 1)
                Alert.alert(
                    "Job Deleted",
                    `You will no longer receive notifications for ${name} district for the age bracket of ${ageBracket}`,
                    [{text: "OK"}]
                )
            })
    } catch(e) {
        console.log("error unregistering ",e.message)
    }
}
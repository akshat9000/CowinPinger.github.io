// const axios = require('axios')
import axios from 'axios';
// from p
const api = "https://exp.host/--/api/v2/push/send"
const token = "ExponentPushToken[RElLO-POXyzWgCSBVYsS9D]"

// let expo = new Expo({ accessToken: token });

// message = JSON.stringify({
//     to: token,
//     body: "test notif",
//     title:"something"
// })

try {
    axios.post(api, {
        
        to: token,
        body: "test notif",
        title:"something"
        
    })
    .then(result => console.log(result.data))
} catch(e) {
    console.log(e)
}
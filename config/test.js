const axios = require('axios')

const fetchURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=14-05-2021"
const appointmentsListLimit = 2
const sampleUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'

function pingCowin() {
    axios.get(fetchURL, {headers: {'User-Agent': sampleUserAgent}}).then((result) => {
        console.log("Axios get")
        const { centers } = result.data;
        let isSlotAvailable = false;
        let dataOfSlot = "";
        let appointmentAvailableCount = 0;
        if (centers.length) {
            console.log("inside line 15")
            // console.log(centers.sessions)
            centers.forEach(center => {
                // console.log("inside line 17")
                center.sessions.forEach((session => {
                    // console.log(session)
                    if (session.min_age_limit <= 45 && session.available_capacity >= 0) {
                        // console.log("inside line 20")
                        isSlotAvailable = true
                        appointmentAvailableCount++;
                        if (appointmentAvailableCount <= appointmentsListLimit){
                            dataOfSlot = `${dataOfSlot}\nSlot for ${session.available_capacity} is available: ${center.name} on ${session.date}`;
                        }
                    }
                }))
            });
            if (appointmentAvailableCount - appointmentsListLimit){
                dataOfSlot = `${dataOfSlot}\n${appointmentAvailableCount - appointmentsListLimit} more slots available...`
            }
        } else {
            console.log("no centers")
        }
        if (isSlotAvailable){
            console.log(dataOfSlot)
        }
    }).catch((err) => {
        console.log("Error: "+err.message);
    })
}

function getDate() {
    var date = ("0" + new Date().getDate()).slice(-2)
    var month = ("0" + (new Date().getMonth() + 1)).slice(-2)
    var year = new Date().getFullYear()

    return date + '-' + month + '-' + year
}

console.log(getDate())
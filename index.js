
const moment = require('moment');
var addTimeArray = (timeArray) => {
    const splitter = /^(\d{0,2}:)?(\d{0,2}:)(\d{0,2})$|^(\d{0,2})$/;
    let totalTime = moment.duration("00:00:00");
    let badValues = [];
    let returnValue;
    for (time of timeArray) {
        try{
            let [,hours,minutes,seconds,secondsOnly] = splitter.exec(time);
            !hours && (hours = '00:');
            !minutes && (minutes = '00:');
            secondsOnly && (seconds = secondsOnly);
            totalTime.add(moment.duration(`${hours}${minutes}${seconds}`));
        } catch(e){
            returnValue = {
                status:'error'
            }
            badValues.push(time);            
        }
    }
    if(!returnValue){
        return {
            status:'success',
            text:`${totalTime.hours().toString(10).padStart(2,'0')}:${totalTime.minutes().toString(10).padStart(2,'0')}:${totalTime.seconds().toString(10).padStart(2,'0')}`
        };
    }  else {
        returnValue.text=badValues.join(',');
        return returnValue;
    }
     
}
module.exports = addTimeArray;
let test1Array = ['59','01'];
let test1result = addTimeArray(test1Array);
 console.log(test1result.text);
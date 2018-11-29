
const moment = require('moment');
const namedRegexp = require("named-js-regexp");

const formatTime = timePart => {
    if(!Number.isInteger(timePart)){
        throw new TypeError('Parameter must be an integer.') //should never happen unless Moment coughs
    }
    return timePart.toString(10).padStart(2,'0');
}
const addTimeArray = (timeArray) => {
    const splitter = /^(?:(:<days>\d+):)?(:<hours>\d{0,2}:)(:<minutes>[0-5]?[0-9]:)(:<seconds>[0-5]?[0-9])$|^(:<hours>\d{0,2}:)?(:<minutes>[0-5]?[0-9]:)(:<seconds>[0-5]?[0-9])$|^(:<seconds>[0-5]?[0-9])$/;
    let re = namedRegexp(splitter);
    let totalTime = moment.duration("00:00:00");
    let badValues = [];
    let returnValue;
    for (time of timeArray) {
        try{
            let {days,hours,minutes,seconds} = re.execGroups(time,false);
            days && (days = `${days}.`);
            !hours && (hours = '00:');
            !minutes && (minutes = '00:');
            totalTime.add(moment.duration(`${(days)?days:''}${hours}${minutes}${seconds}`));
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
            text:`${formatTime(totalTime.days())}:${formatTime(totalTime.hours())}:${formatTime(totalTime.minutes())}:${formatTime(totalTime.seconds())}`
        };
    }  else {
        returnValue.text=badValues.join(',');
        return returnValue;
    }
     
}
module.exports = addTimeArray;
let test6Array = ['01:02:00:01','1:00:01'];
let test1result = addTimeArray(test6Array);
 //console.log(test1result.text);
/* functions.js */

// Process day's data to get average weather parameters
// for main view
function processDays(daysArr, city){
    var weatherObj = {
        'city' : { 'name': '' },
        'days' : []
    };

    weatherObj.city.name = city;

    for (var i = 0; i < daysArr.length; i++) {

        var dayObj = {'dayDetails':{}},
        	dateFormatted = undefined,
            tempMin,
            tempMax,
            condition,
            conditionArr = {'Clear': 0, 'Clouds': 0, 'Rain': 0},
            conditionMaxValue,
            key;

        for (var j = 0; j < daysArr[i].length; j++) {
        	if (dateFormatted == undefined){
                dateFormatted = timeConverter(daysArr[i][j].dt);
            }
            if (tempMax == undefined || tempMax < Math.round(daysArr[i][j].main.temp_max)){
                tempMax = Math.round(daysArr[i][j].main.temp_max);
            }
            if (tempMin == undefined || tempMin > Math.round(daysArr[i][j].main.temp_min)){
                tempMin = Math.round(daysArr[i][j].main.temp_min);
            }

            switch(daysArr[i][j].weather[0].main) {
                case 'Clear':
                    conditionArr.Clear++;
                    break;
                case 'Clouds':
                    conditionArr.Clouds++;
                    break;
                case 'Rain':
                    conditionArr.Rain++;
                    break;
            }
        }

        conditionMaxValue = Math.max(conditionArr.Clear, conditionArr.Clouds, conditionArr.Rain);
        condition = getKey(conditionArr, conditionMaxValue);


        dayObj.dayDetails.date = dateFormatted;
        dayObj.dayDetails.min = tempMin;
        dayObj.dayDetails.max = tempMax;
        dayObj.dayDetails.condition = condition;
        dayObj.dayDetails.details = daysArr[i];

        weatherObj.days.push(dayObj);
    }

    /* Returning Schema:
    var weatherObj = {
        'city' : { 'name': '' },
        'days' : [{
            'dayDetails' : {
            	'date': 'June, 28'
                'min': 0,
                'max': 0,
                'condition': 'sunny',
                'details': daysArr[i]
            }
        }]
    };
    */
    return weatherObj;
}


// split array into separate days
function splitByDays(rawData){

    var classifiedData = rawData,
        listDays = [],
        today = new Date();


    for (var j = 0; j < rawData.list.length; j++) {

        var day = new Date(rawData.list[j].dt*1000);
        var dateDiff = getDateDiff(today, day);

        if(typeof listDays[dateDiff] == 'undefined'){
            listDays[dateDiff] = [];
            listDays[dateDiff].push(rawData.list[j]);
        } else {
            listDays[dateDiff].push(rawData.list[j]);
        }
    }

    return listDays;
}


// calculate day difference to split entire array into separate days
function getDateDiff(dateEarlier, dateLater) {
    var one_day=1000*60*60*24
    return (  Math.round((  (dateLater.getTime() + 1000*60*60*12) - dateEarlier.getTime())/one_day)  );
}


// convert timestamp to custom data format
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    //var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = month + ', ' + date;

    return time;
}

// get object key by value
function getKey(obj, value){
    for(var key in obj){
        if(obj[key] == value){
            return key;
        }
    }
    return null;
}

// Auxiliary checks if object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
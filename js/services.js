'use strict';


// Share data between controllers
app.factory('shareDataService', function () {
    var shareData = {};

    var addObj = function(newObj) {
        shareData = newObj;
    }

    var getObj = function(){
        return shareData;
    }

    return {
        addObj: addObj,
        getObj: getObj
    };
});

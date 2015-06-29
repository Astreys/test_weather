'use strict';

app.controller('SearchCtrl', function ($scope, $http, $filter, $location, shareDataService) {

    // model
    $scope.m = {};
    // hardcoded list of provinces
    $scope.m.provinces = [
        {code: 'ab', name: 'Alberta'},
        {code: 'bc', name: 'British columbia'},
        {code: 'mb', name: 'Manitoba'},
        {code: 'nb', name: 'New Brunswick'},
        {code: 'nl', name: 'Newfoundland and Labrador'},
        {code: 'ns', name: 'Nova Scotia'},
        {code: 'nt', name: 'Northwest Territories'},
        {code: 'nu', name: 'Nunavut'},
        {code: 'on', name: 'Ontario'},
        {code: 'pe', name: 'Prince Edward Island'},
        {code: 'qc', name: 'Quebec'},
        {code: 'sk', name: 'Saskatchewan'},
        {code: 'yt', name: 'Yukon'}
    ];
    // loader
    $scope.m.loading      = false;
    $scope.m.errorMessage = false;
    $scope.m.units        = "metric";


    $scope.checkLocation = function(){
        var location,
            locationArr  = [],
            city,
            province,
            provinceCode,
            url;
        $scope.m.loading = true;


        if($scope.m.location != undefined && $scope.m.location != ''){
            location = $scope.m.location.trim();

            // TODO add validation for city and province from the model before insert it in the url
            locationArr  = location.split(',');

            if(locationArr.length > 1){
                city         = locationArr[0].trim();
                province     = locationArr[1].trim();
                provinceCode = ($filter('getCodeByName')($scope.m.provinces, province)).code;
                url          = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + provinceCode + '&units=' + $scope.m.units;

                $http.get(url).
                    success(function(data, status, headers, config) {
                        if(data.cod != 404){
                            shareDataService.addObj(city + ',' + province);
                            $scope.m.errorMessage = false;
                            $location.path('/weather');
                        } else {
                            $scope.m.loading = false;
                            $scope.m.errorMessage = true;
                        }
                    }).
                    error(function(data, status, headers, config) {
                        if(config.cod == 404){
                            //$scope.m.errorMessage = true;
                        }
                    });
            } else {
                $scope.m.loading = false;
                $scope.m.errorMessage = true;
            }
        }
    };

});


app.controller('MainCtrl', function ($scope, $http, $filter, $location, shareDataService) {
    // model
    $scope.m = {};
    // hardcoded list of provinces
    $scope.m.provinces = [
        {code: 'ab', name: 'Alberta'},
        {code: 'bc', name: 'British columbia'},
        {code: 'mb', name: 'Manitoba'},
        {code: 'nb', name: 'New Brunswick'},
        {code: 'nl', name: 'Newfoundland and Labrador'},
        {code: 'ns', name: 'Nova Scotia'},
        {code: 'nt', name: 'Northwest Territories'},
        {code: 'nu', name: 'Nunavut'},
        {code: 'on', name: 'Ontario'},
        {code: 'pe', name: 'Prince Edward Island'},
        {code: 'qc', name: 'Quebec'},
        {code: 'sk', name: 'Saskatchewan'},
        {code: 'yt', name: 'Yukon'}
    ];
    $scope.m.loading      = true;
    $scope.m.errorMessage = false;
    $scope.m.units = "metric";
    $scope.m.weatherdata = {};
    $scope.m.location = {};
    $scope.m.showDetails = false;
    $scope.Math = window.Math;


    if(!isEmpty(shareDataService.getObj())){
        $scope.m.location = shareDataService.getObj();
    }

    $scope.getWeather = function(){
        var location,
            locationArr  = [],
            city,
            province,
            provinceCode,
            url;

        $scope.m.loading = true;

        if($scope.m.location != undefined && $scope.m.location != ''){
            location = $scope.m.location.trim();

            // TODO add validation for city and province from the model before insert it in the url
            locationArr  = location.split(',');

            if(locationArr.length > 1){
                city         = locationArr[0].trim();
                province     = locationArr[1].trim();
                provinceCode = ($filter('getCodeByName')($scope.m.provinces, province)).code;
                url          = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + provinceCode + '&units=' + $scope.m.units;

                $http.get(url).
                    success(function(data, status, headers, config) {
                        if(data.cod != 404){
                            $scope.m.weatherdata = processDays(splitByDays(data), data.city.name);

                            console.log($scope.m.weatherdata);
                            $scope.m.errorMessage = false;
                            $scope.m.loading = false;
                        } else {
                            $scope.m.loading = false;
                            $scope.m.errorMessage = true;
                        }
                    }).
                    error(function(data, status, headers, config) {
                        if(config.cod == 404){
                            //$scope.m.errorMessage = true;
                        }
                    });
            } else {
                $scope.m.loading = false;
                $scope.m.errorMessage = true;
            }
        }
    };

    $scope.changeUnits = function(units){
        $scope.m.units = units;
        $scope.getWeather();
    };

    $scope.toggleDetails = function(){
        if ($scope.m.showDetails){
            $scope.m.showDetails = false;
        } else {
            $scope.m.showDetails = true;
        }
    }

    $scope.getWeather();

});


app.controller('HeaderCtrl', function ($scope, shareDataService) {
    // model
    /*
    $scope.m = {};
    $scope.m.units = "metric";

    $scope.changeUnits = function(units){
        //console.log(units);
        $scope.m.units = units;

        shareDataService.addObj(units);
    }
    */
});
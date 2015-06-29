'use strict';

app.config(function($routeProvider) {
    $routeProvider.when(
    	'/search',
    	{
    		templateUrl: 'partials/search.html',
    		controller: 'SearchCtrl'
    	});
    $routeProvider.when(
    	'/weather',
    	{
    		templateUrl: 'partials/weather.html',
    		controller: 'MainCtrl'
    	});
    $routeProvider.otherwise(
        {
            redirectTo: '/search'
        });
});
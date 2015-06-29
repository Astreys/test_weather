describe('MainCtrl', function(){
	var $rootScope,
		$scope,
		controller;

	beforeEach(function(){
		module('weatherApp');

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('MainCtrl', {$scope: $scope});
		});
	});

	describe('Initialization', function(){
	});

	describe('Action Handlers', function(){
	});
});
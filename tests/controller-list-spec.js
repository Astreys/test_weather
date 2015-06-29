describe("MyCtrl1", function(){
	var $rootScope,
		$scope,
		controller;

	beforeEach(function(){
		module('contactListApp');

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('MyCtrl1', {$scope: $scope});
		});
	});

	describe('Initialization', function(){
		it('Should instantiate contact list with 14 records', function(){
			expect($scope.m.list.length).toEqual(14);
		});
	});

	describe('Action Handlers', function(){

		describe("Delete Contact", function(){
			it('Should decrement contact list by one', function(){
				expect($scope.m.list.length).toEqual(14);
				$scope.deleteRecord(0);
				expect($scope.m.list.length).toEqual(13);
			});

			it('Should do nothing if contact list is empty', function(){
				$scope.m.list = [];
				$scope.deleteRecord(0);
				expect($scope.m.list.length).toEqual(0);
			});
		});

		describe("Edit Contact", function(){
			it('Should stay same length', function(){
				var editedRecord = {
					first_name: 'John',
			        last_name:  'Doe',
			        address:    '1 Main Str',
			        city:       'Gotham',
			        province:   'AB',
			        zip:        'A0A0A0',
			        phone:      '4165555555'
				}
				$scope.m.editRecordIndex = 0;

				expect($scope.m.list.length).toEqual(14);
				$scope.editRecord(editedRecord);
				expect($scope.m.list.length).toEqual(14);
			});

			it('Should contain new updated record after editing', function(){
				var editedRecord = {
					first_name: 'John',
			        last_name:  'Doe',
			        address:    '1 Main Str',
			        city:       'Gotham',
			        province:   'AB',
			        zip:        'A0A0A0',
			        phone:      '4165555555'
				}
				$scope.m.editRecordIndex = 0;

				$scope.editRecord(editedRecord);
        		expect(editedRecord).toEqual($scope.m.list[0]);
			});
		});
	});
});
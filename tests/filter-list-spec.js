describe("tel", function(){
	var $filter, filter;

	beforeEach(function(){
		module('contactListApp');

		inject(function($injector){
			$filter = $injector.get('$filter');
			filter = $filter('tel');
		});
	});


	it('Should return null when null is passed in', function(){
		expect(filter(null)).toBeNull();
	});

	it('Should return blank string when a blank string is passed in', function(){
		expect(filter("")).toEqual("");
	});

	it('Should return formatted phone number', function(){
		expect(filter('4165555555')).toEqual("(416) 555-5555");
	});
});
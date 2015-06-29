'use strict';

app.directive('enterSubmit', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('keydown', function(event) {
                 var code = event.keyCode || event.which;
                 if (code === 13) {
                        if (typeof scope.checkLocation != 'undefined') {
                            scope.checkLocation();
                        } else {
                            scope.getWeather();
                        }

                 }
            });
        }
    }
});
'use strict';

app.filter('getCodeByName', function() {
    return function(input, name) {
        var i = 0,
            len = input.length;

        for (; i < len; i++) {
            if (input[i].name.toLowerCase() == name.toLowerCase()) {
                return input[i];
            }
        }
        return null;
    }
});


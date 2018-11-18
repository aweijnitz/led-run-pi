const assert = require('assert');

const colors = require('../lib/colors');



describe('Color matching', function () {
    describe('basic library check', function () {
        it('should return same Hue for different red saturations', function () {
            let baseCol = 0xff0000;
            let gameCol = colors.red(); // 0xff2800;


            assert.ok(distance < 2);


        });

        it('should return same Hue for different blue saturations', function () {

        });

    });
});
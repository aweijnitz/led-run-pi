const assert = require('assert');

const colors = require('../lib/color-utils');



describe('Color matching', function () {
    describe('basic library check', function () {
        it('should return  true for same colors', function () {
            let c0 = colors.blue();
            let c1 = colors.blue();

            assert.ok(colors.isSame(c0, c1));
        });

        it('should return false for same nuance, but different names', function () {
            let c0 = colors.red();
            let c1 = colors.blue();
            c1.nuance = c0.nuance;

            assert.ok(!colors.isSame(c0, c1));
        });

    });
});
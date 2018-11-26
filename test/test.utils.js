const assert = require('assert');

const utils = require('../lib/utils');
const zones = require('../config/colorZones');



describe('Utils', function () {
    describe('inside', function () {
        it('should return  true for points inside the interval', function () {

            assert.ok(utils.inside(10, 9, 11));
            assert.ok(utils.inside(10, 10, 11));
            assert.ok(utils.inside(10, 10, 10));
        });

        it('should return false points outside the interval', function () {
            assert.ok(!utils.inside(10, 11, 12));
        });

    });
    describe('toColor', function () {
        it('should return red as default', function () {
            assert.equal(utils.toColor(-1, zones).name, 'red');
        });

        it('should map point to a color if in zone', function () {
            assert.equal(utils.toColor(zones[1].min + 1, zones).name, zones[1].color.name);
        });

    });
});
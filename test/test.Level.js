const assert = require('assert');

const Level = require('../lib/Level');
const Enemy = require('../lib/Enemy');

describe('Level', function () {
    describe('constructor', function () {
        it('should set level enemies', function () {
            let l = new Level([1,2]);
            assert.equal(2, l.enemies.length);
        });
    });

    describe('reset', function () {
        it('should reset enemies', function () {
            let l = new Level([new Enemy(), new Enemy()]);
            l.enemies[0].pos = 1;
            l.enemies[1].pos = 2;
            assert.equal(l.enemies[0].pos, 1);
            assert.equal(l.enemies[1].pos, 2);
            l.reset();
            assert.equal(l.enemies[0].pos, 0);
            assert.equal(l.enemies[1].pos, 0);

        });
    });
});
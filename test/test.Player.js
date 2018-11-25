const assert = require('assert');

const Player = require('../lib/Player').Player;
const PM = require('../lib/Player');
const MAX_POS = require('../lib/World').MAX_POS;

describe('Player', function () {
    describe('reduceLife', function () {
        it('should reduce lives left by one', function () {
            let p = new Player();
            let lives = p.lives;
            p.reduceLife();
            assert.equal(p.lives, lives - 1);
        });

        it('should reduce length remaining by one segment', function () {
            let p = new Player();
            let length = p.length;
            p.reduceLife();
            assert.equal(p.length, length - (PM.PLAYER_INIT_LENGTH / PM.NR_LIVES));
        });
    });

    describe('isDead', function () {
        it('should be true when no lives remaining', function () {

            let p = new Player();
            p.reduceLife();
            p.reduceLife();
            p.reduceLife();
            assert.ok(p.isDead());
        });

    });

    describe('reset', function () {

        it('should set position to World MAX', function () {

            let p = new Player();
            p.pos = MAX_POS / 2;
            p.reset();
            assert.equal(MAX_POS, p.pos);
        });
    });
});
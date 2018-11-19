const assert = require('assert');

const Player = require('../lib/Player').Player;
const Enemy = require('../lib/Enemy');

describe('Enemy', function () {
    describe('collision', function () {

        it('should NOT collide (verifying bugfix)', function () {
            let p = new Player();
            let e = new Enemy();
            p.pos = 96.85000000000002;
            e.pos = 0.08600000000000001;

            assert.ok(!e.isCollision(p));
        });

        it('should collide if not same color and player head is at same, or lower position as enemy head (overlapping head-side)', function () {
            let p = new Player();
            let e = new Enemy();
            p.pos = 50;
            e.pos = 55;

            assert.ok(e.isCollision(p));
        });

        it('should not collide if same color and player head is at same, or lower position (overlapping head-side)', function () {
            let p = new Player();
            let e = new Enemy();
            p.color = e.color;
            p.pos = 50;
            e.pos = 55;

            assert.ok(!e.isCollision(p));
        });

        it('should not collide if already collided once', function () {
            let p = new Player();
            let e = new Enemy();
            p.pos = 50;
            e.pos = 55;
            e.collidedWithPlayer = true; // fake previous collision

            assert.ok(!e.isCollision(p));
        });

        it('should collide if not same color and player tail is at same, or higher position as enemy tail (overlapping tail-side)', function () {
            let p = new Player();
            let e = new Enemy();
            e.pos = 55;
            p.pos = e.pos - (p.length + 1);

            assert.ok(e.isCollision(p));
        });

        it('should not collide if same color and player tail is at same, or higher position as enemy tail (overlapping tail-side)', function () {
            let p = new Player();
            let e = new Enemy();
            p.color = e.color;
            e.pos = 55;
            p.pos = e.pos - (p.length + 1);

            assert.ok(!e.isCollision(p));
        });

    });

    describe('reset', function () {

        it('should reset pos', function () {
            let e = new Enemy();
            e.pos = 1;
            assert.equal(e.pos, 1);
            e.reset();

            assert.equal(e.pos, 0);
        });
    });

});

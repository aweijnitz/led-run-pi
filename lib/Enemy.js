const colors = require('./colors');
const inside = require('./utils').inside;
const worldMax = require('./World').MAX_POS;
const worldMin = require('./World').MIN_POS;

const ENEMY_LENGTH = 8.0;
let DEFAULT_COLOR = colors.red();



/**
 * Simple data class for representing the state of enemies on a level.
 * Enemies have a few defining properties; color, start time (relative to previous enemy), id.
 * The position is in world coordinates (not screen coorinates!)
 * @type {module.Enemy}
 */
module.exports = class Enemy {
    constructor(color = DEFAULT_COLOR, startTimeMS = 300, id = -1) {
        this.color = color;
        this.startTimeMS = startTimeMS; // Relative to level start time
        this.id = id;
        this.pos = 0;
        this.velocity = 0;
        this.length = ENEMY_LENGTH;
        this.collidedWithPlayer = false; // Enemy can only collide once per level with a player
        this.isVisible = true;
    }

    reset() {
        this.pos = 0;
        this.velocity = 0;
        this.collidedWithPlayer = false;
    }

    update(dt) {
        this.pos += this.velocity * dt;
        if (this.pos >= worldMax && this.length > 0) {
            this.pos = worldMax;
            this.length -= 1;
        } else if (this.pos >= worldMax && this.length <= 0) {
            this.pos = worldMax;
            this.isVisible = false;
        }
    }


    isCollision(player) {

        let p0 = player.pos;
        let p1 = player.pos + player.length;
        let e0 = this.pos;
        let e1 = this.pos - this.length;

        return !this.collidedWithPlayer
            && (!colors.isSame(player.color, this.color)
                && (inside(p0, e0, e1) || inside(p1, e0, e1)));
    }
};


/*

0 ---------------------------------------------------- MAX

     e1 ----- e0     e1 ------- e0
  p0 ---- p1                p0 ------ p1

 */
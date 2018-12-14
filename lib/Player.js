const colors = require('./color-utils');

const worldMax = require('./World').MAX_POS;
const worldMin = require('./World').MIN_POS;

const SEGMENT_LENGTH = 3.0;
const NR_LIVES = 3;
const PLAYER_INIT_LENGTH = NR_LIVES * SEGMENT_LENGTH;
const DEFAULT_COLOR = colors.white();

module.exports.PLAYER_INIT_LENGTH = PLAYER_INIT_LENGTH;
module.exports.NR_LIVES = NR_LIVES;

/**
 * Simple data class for representing the state of the player on a level.
 *
 * The position is in world coordinates (not screen coorinates!)
 * @type {module.Player}
 */
module.exports.Player = class Player {
    constructor(color = DEFAULT_COLOR, mass = 1.0) {
        this.color = color;
        this.mass = mass;
        this.pos = require('./World').MAX_POS;
        this.velocity = 0;
        this.collided = false;
        this.lives = NR_LIVES;
        this.length = PLAYER_INIT_LENGTH;
        this.isVisible = true;
    }

    reset() { // level reset. Preseve length and lives left
        this.pos = require('./World').MAX_POS;
        this.velocity = 0;
        this.collided = false;
        this.isVisible = true;
    }

    update(dt, color) {
        this.pos += this.velocity*dt;
        this.color = color;
        if(this.pos <= 0 && this.length > 0) {
            this.length -= 1;
        } else if(this.pos <= 0 && this.length <= 0) {
            this.isVisible = 0;
        }
    }


    reduceLife() {
        this.lives--;
        this.length -= SEGMENT_LENGTH;
    }

    isDead() {
        return this.lives <= 0;
    }
};
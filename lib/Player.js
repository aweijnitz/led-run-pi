const colors = require('./colors');

const MAX_POS = 100.0;
const PLAYER_INIT_LENGTH = 6.0;
const NR_LIVES = 3;
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
        this.pos = MAX_POS;
        this.velocity = 0;
        this.collided = false;
        this.lives = NR_LIVES;
        this.length = PLAYER_INIT_LENGTH;
    }

    reset() {
        this.pos = MAX_POS;
        this.velocity = 0;
        this.length = PLAYER_INIT_LENGTH;
        this.collided = false;
    }

    update(dt) {
        this.pos += this.velocity*dt;
    }

    reduceLife() {
        this.lives--;
        this.length -= PLAYER_INIT_LENGTH / NR_LIVES;
    }

    isDead() {
        return this.lives <= 0;
    }
};
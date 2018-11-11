const MAX_POS = require('./World').MAX_POS;

/**
 * Simple data class for representing the state of the player on a level.
 *
 * The position is in world coordinates (not screen coorinates!)
 * @type {module.Player}
 */
module.exports = class Player {
    constructor(color = 0xaaaaaa, mass = 1.0) {
        this.color = color;
        this.mass = mass;
        this.pos = MAX_POS;
        this.velocity = 0;
        this.collided = false;
        this.lives = 3;
    }

    reset() {
        this.pos = MAX_POS;
        this.velocity = 0;
    }

    update(dt) {
        this.pos += this.velocity*dt;
    }

    isCollided() {
        return this.collided;
    }

    doCollision() {
        this.collided = true;
        this.lives--;
    }

    isDead() {
        return this.lives <= 0;
    }
};
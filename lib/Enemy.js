/**
 * Simple data class for representing the state of enemies on a level.
 * Enemies have a few defining properties; color, start time (relative to previous enemy), mass (0,1]
 * The position is in world coordinates (not screen coorinates!)
 * @type {module.Enemy}
 */
module.exports = class Enemy {
    constructor(color = 0xff0000, startTimeMS = 300, mass = 0.5) {
        this.color = color;
        this.startTimeMS = startTimeMS; // Relative to level start time
        this.mass = mass;
        this.pos = 0;
        this.velocity = 0;
    }

    reset() {
        this.pos = 0;
        this.velocity = 0;
    }

    update(dt) {
        this.pos += this.velocity*dt;
    }
};
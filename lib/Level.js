module.exports = class Level {
    constructor(enemies = []) {
        this.enemies = enemies;
    }

    reset() {
        this.enemies.forEach((e) => e.reset());
    }


};
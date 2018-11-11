const ENEMY_VELOCITY = 2/1000; // 2 cm per second

module.exports = class WorldStage {
    constructor(logger) {
        this.enemies = [];
        this.logger = logger;
    }

    reset() {
        this.logger.debug('WorldStage - Reset');
        this.enemies = [];
    }

    enterEnemy(enemy, gameSpeed) {
        this.logger.debug('WorldStage - Adding enemy');
        enemy.velocity = ENEMY_VELOCITY * (1.0 + (1 - gameSpeed));
        enemy.pos = 0;
        this.enemies.push(enemy);
    }

};
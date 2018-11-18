const ENEMY_VELOCITY = 2/1000; // 2 cm per second
const PLAYER_VELOCITY = 5/1000; // 2 cm per second

module.exports = class WorldStage {
    constructor(logger) {
        this.enemies = [];
        this.player = undefined;
        this.logger = logger;
    }

    reset() {
        this.logger.debug('WorldStage - Reset');
        this.enemies = [];
        if(!!this.player)
            this.player.reset();
    }

    enterEnemy(enemy, gameSpeed) {
        this.logger.debug('WorldStage - Adding enemy');
        enemy.velocity = ENEMY_VELOCITY * (1.0 + (1 - gameSpeed));
        enemy.pos = 0;
        this.enemies.push(enemy);
    }

    enterPlayer(player, gameSpeed) {
        this.logger.debug('WorldStage - Enter player');
        player.velocity = PLAYER_VELOCITY * (1.0 + (1 - gameSpeed));

        this.player = player;
    }

};
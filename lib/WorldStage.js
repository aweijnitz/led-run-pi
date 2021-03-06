const util = require('util');

const ENEMY_VELOCITY = 8/1000;
const PLAYER_VELOCITY = -10/1000;

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
        this.logger.debug('WorldStage - Enter enemy: ' + enemy.color.name);
        //this.logger.debug(util.inspect(enemy, false, null, true));
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
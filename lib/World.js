
const WorldStage = require('./WorldStage');
const Player = require('./Player').Player;
const MIN_POS = 0.0;
const MAX_POS = 144.0;
const PLAYER_LENGTH = 5.0;

module.exports.MIN_POS = MIN_POS;
module.exports.MAX_POS = MAX_POS;


module.exports.World = class World {

    constructor(levels, logger, gameSpeed = 1.0) {
        this.levels = levels;
        levels.forEach((level) => level.reset());
        this.gameSpeed = gameSpeed;
        this.currentLevel = 0;
        this.logger = logger;
        this.stage = new WorldStage(logger);
        this.player = new Player();

        this.loopCount = 0; // debug
    }

    reset() {
        this.levels.forEach((level) => level.reset());
        this.currentLevel = 0;
        this.loopCount = 0; // debug
        this.player.reset();
    }

    initLevel(levelNr, gameSpeed = 1.0) {
        this.logger.info('World::initLevel - Initializing new level ' + levelNr);
        this.stage.reset();
        this.gameSpeed = gameSpeed;
        this.stage.enterPlayer(this.player, this.gameSpeed);

        if (levelNr === undefined || levelNr < 0 || levelNr >= this.levels.length)
            throw new Exception('initLevels: no such level ' + levelNr);

        let level = this.levels[levelNr % this.levels.length];
        this.currentLevel = levelNr % this.levels.length;
        //this.logger.debug('World::initLevel Nr enemies for level: ' + level.enemies.length);
        level.enemies.forEach((enemy) => {
            setTimeout(() => {
                this.stage.enterEnemy(enemy, this.gameSpeed);
            }, enemy.startTimeMS)
        });

        return this.currentLevel;

    }

    nextLevel() {
        this.currentLevel++;
        if (this.levelsRemaining() < 0) {
            this.logger.debug('World::nextLevel - ALL LEVELS DONE!');
        }
        this.currentLevel %= this.levels.length;
        this.logger.debug('World::nextLevel -> Next level ' + this.currentLevel);
        return this.currentLevel;
    }

    updateEnemies(dt) {

        this.stage.enemies.forEach((e) => e.update(dt));
    }

    updatePlayer(dt, color) {
        this.stage.player.update(dt, color);
    }

    resolveCollisions() {
        this.stage.enemies.forEach((e) => {
            if(e.isCollision(this.stage.player)) {
                e.collidedWithPlayer = true;
                this.stage.player.reduceLife();
                this.logger.debug('Player LOST ONE LIFE! p:' + this.stage.player.pos + ' e:' + e.pos + ' id:' + e.id);
            }
        });
    }

    isLevelComplete() {
        // Level complete == player reached top of the LED strip (pos 0)

        if (this.levelsRemaining() < 0) {
            this.logger.debug('World::levelComplete - ALL LEVELS DONE!');
        }

        return this.player.pos <= 0;
    }

    levelsRemaining() {
        return (this.levels.length - 1) - this.currentLevel;
    }

    isGameOver() {
        return this.player.isDead();
    }


};
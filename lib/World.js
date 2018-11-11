const WorldStage = require('./WorldStage');
const MIN_POS = 0.0;
const MAX_POS = 100.0;

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
    }

    initLevel(levelNr) {
        this.logger.info('World::initLevel - Initializing new level ' + levelNr);
        this.stage.reset();
        if(levelNr < 0 || levelNr >= this.levels.length)
            throw new Exception('initLevels: no such level ' + levelNr);

        let level = this.levels[levelNr % this.levels.length];
        this.logger.debug('World::initLevel Nr enemies for level: ' + level.enemies.length);
        level.enemies.forEach((enemy) => {
            setTimeout(() => {
                this.stage.enterEnemy(enemy, this.gameSpeed);
            }, enemy.startTimeMS)
        });
    }

    nextLevel() {
        this.currentLevel++;
        if(levelsRemaining() == 0) {
            this.logger.debug('World::nextLevel - ALL LEVELS DONE!');
        }
        this.currentLevel %= this.levels.length;
        return this.currentLevel;
    }

    updateEnemies(dt) {
    }

    updatePlayer(dt) {

    }

    resolveCollisions() {

    }

    levelComplete() {
        // Level complete == player reached top of the LED strip (pos 0)

        if(this.levelsRemaining() == 0) {
            this.logger.debug('World::levelComplete - ALL LEVELS DONE!');
        }

        return false;
    }

    levelsRemaining() {
        return this.currentLevel - (this.levels.length - 1) ;
    }

    isGameOver() {
      return false;
    }
};
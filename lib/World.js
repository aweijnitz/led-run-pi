const MIN_POS = 0.0;
const MAX_POS = 100.0;

module.exports.MIN_POS = MIN_POS;
module.exports.MAX_POS = MAX_POS;

module.exports.World = class World {

    constructor(levels, gameSpeed = 1.0) {
        this.levels = levels;
        levels.forEach((level) => level.reset());
        this.gameSpeed = gameSpeed;
        this.currentLevel = 0;
    }

    updateEnemies(dt) {}
    updatePlayer(dt) {}
    resolveCollisions() {}

    levelComplete() {
        return false;
    }

    levelsRemaining() {
        return currentLevel - (this.levels.length - 1) ;
    }

    isGameOver() {
      return false;
    }
};
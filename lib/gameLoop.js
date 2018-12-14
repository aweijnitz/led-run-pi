//const Controller = require('./DevelopmentController');
const Controller = require('./UltrasonicController');
let controller = undefined;

/**
 * The game loop makes the world tick. It is called at regular intervals from the main app.
 *
 * @param deltaT - Function that returns the interval to base the update on
 * @param world - The game world
 * @param logger - For logging
 */
module.exports = function gameLoop(deltaT, world, controller, logger) {
    let dt = deltaT();



    let color = controller.getCurrentColor();
    //logger.debug('DIST: ' + controller.getCurrentDistance());
    world.updatePlayer(dt, color);
    if(!world.isLevelComplete() && !world.isGameOver()) {
        world.updateEnemies(dt);
        world.resolveCollisions();
    } else if (world.isLevelComplete() && !world.isGameOver()) {
        logger.debug('gameloop -> LEVEL COMPLETE! Remaining: ' + world.levelsRemaining());
    } else {
        //logger.debug('GAME OVER');
    }

};
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
module.exports = function gameLoop(deltaT, world, logger) {
    let dt = deltaT();

    if(!controller) {
        controller = new Controller(100, logger);
        controller.start();
    }

    let color = controller.getCurrentColor();
    //logger.debug('DIST: ' + controller.getCurrentDistance());
    world.updatePlayer(dt, color);
    if(!world.isLevelComplete()) {
        world.updateEnemies(dt);
        world.resolveCollisions();
    }

};
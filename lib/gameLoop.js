const Controller = require('./DevelopmentController');
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
        controller = new Controller(250, logger);
        controller.start();
    }

    let color = controller.getCurrentColor();
    world.updatePlayer(dt, color);
    if(!world.isLevelComplete()) {
        world.updateEnemies(dt);
        world.resolveCollisions();
    }

};
/**
 * The game loop makes the world tick. It is called at regular intervals from the main app.
 *
 * @param deltaT - Function that returns the interval to base the update on
 * @param world - The game world
 * @param logger - For logging
 */
module.exports = function gameLoop(deltaT, world, logger) {
    let dt = deltaT();
    //logger.info('GAME LOOP ' + dt);

    world.updateEnemies(dt);
    world.updatePlayer(dt);
    world.resolveCollisions();

};
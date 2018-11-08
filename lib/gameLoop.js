module.exports = function gameLoop(deltaT, world, logger) {
    let dt = deltaT();
    //logger.info('GAME LOOP ' + dt);

    world.updateEnemies(dt);
    world.updatePlayer(dt);
    world.resolveCollisions();

};
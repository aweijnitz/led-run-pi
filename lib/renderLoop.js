const textRender = require('./textRenderer');

/**
 * The game loop makes the world tick. It is called at regular intervals from the main app.
 *
 * @param world - The game world
 * @param logger - For logging
 */
module.exports = function renderLoop(world, logger) {

    textRender(world, logger);
};
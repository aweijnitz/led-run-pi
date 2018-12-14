//const textRender = require('./rendering/textRenderer');
const renderer = require('./rendering/dotStarGameRenderer');

/**
 * The game loop makes the world tick. It is called at regular intervals from the main app.
 *
 * @param world - The game world
 * @param logger - For logging
 */
module.exports = function renderLoop(world, logger) {

    renderer(world, logger);
};
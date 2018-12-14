//const textRender = require('./rendering/textRenderer');
const renderer = require('./rendering/dotStarGameRenderer');

module.exports = function demoLoop(logger) {

    renderer(logger);
};
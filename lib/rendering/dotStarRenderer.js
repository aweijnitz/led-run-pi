/**
 * Driver to render work to the DotStar LED strip.
 *
 *
 * Important Limitation!!!
 *
 * This really needs to be a singleton, as it is currently wired to a specific device (spidev0.0).
 * There is currently no check or guard against multi-require from other libs though, so take care.
 *
 */

const colors = require('../colors');
const dotstar = require('dotstar');
const SPI = require('pi-spi');
const spi = SPI.initialize('/dev/spidev0.0');

//const screenMax = 144; // LED strip length in pixels
const screenMax = require('../../config/gameProperties').STRIP_LENGTH;
const screenMin = 0;
const worldMax = require('../World').MAX_POS;
const worldMin = require('../World').MIN_POS;
const ratio = (screenMax - screenMin) / (worldMax - worldMin);
const defaultAlpha = 1;
const bgColor = [0,0,0,1];

const ledStrip = new dotstar.Dotstar(spi, {
    length: screenMax
});

const clearScreen = function clearScreen() {
    ledStrip.all(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    ledStrip.sync();
};

/**
 * Set pixel, but do not sync to device (LED strip)
 * @param index
 * @param colorArray
 */
const setPixel = function(index, ledColor) {
    ledStrip.set(index, ledColor[0], ledColor[1], ledColor[2], ledColor[3]);
};

const r = function (rgb) {
  return rgb >> 16
};

const g = function (rgb) {
    return (rgb & 0xff00) >> 8;
};

const b = function (rgb) {
    return (rgb & 0xff);
};

const colorNameToLEDColor = (col) => {
    let result = [0, 0, 0, 1]; // black

    switch (col) {
        case 'blue':
            result = [r(colors.blue().nuance), g(colors.blue().nuance), b(colors.blue().nuance), defaultAlpha];
            break;
        case 'red':
            result = [r(colors.red().nuance), g(colors.red().nuance), b(colors.red().nuance), defaultAlpha];
            break;
        case 'green':
            result = [r(colors.green().nuance), g(colors.green().nuance), b(colors.green().nuance), defaultAlpha];
            break;
        case 'yellow':
            result = [r(colors.yellow().nuance), g(colors.yellow().nuance), b(colors.yellow().nuance), defaultAlpha];
            break;
        case 'white':
            result = [r(colors.white().nuance), g(colors.white().nuance), b(colors.white().nuance), defaultAlpha];
            break;
        default:
            return result;
    }
    return result;
};

const toScreenCoord = (p, ratio) => {

    return screenMin + Math.floor(p * ratio);
};

clearScreen();

module.exports = function dotStarRenderer(world, logger) {

    clearScreen();

    world.stage.enemies.forEach((e) => {
        let i = 0;
        let pos = 0;
        while (i++ < e.length) {
            pos = e.pos - i;
            if (e.isVisible && pos >= worldMin && pos < worldMax)
                setPixel(toScreenCoord(pos, ratio), colorNameToLEDColor(e.color.name));
        }
    });


    let player = world.stage.player;
    let i = 0;
    let pos = 0;
    while (i++ < player.length) {
        let pos = player.pos + i;
        if (pos >= worldMin && pos < worldMax)
            setPixel(toScreenCoord(pos, ratio), colorNameToLEDColor(player.color.name));
    }

    // Render to strip
    ledStrip.sync();

};

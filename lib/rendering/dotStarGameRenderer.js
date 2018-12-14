/**
 * Driver to render level state to the DotStar LED strip.
 *
 */

const colors = require('../color-utils');
const Color = require('color');

//const screenMax = 144; // LED strip length in pixels
const screenMax = require('../../config/gameProperties').STRIP_LENGTH;
const screenMin = 0;
const worldMax = require('../World').MAX_POS;
const worldMin = require('../World').MIN_POS;
const ratio = (screenMax - screenMin) / (worldMax - worldMin);
const defaultAlpha = 0.3;
const bgColor = [0, 0, 0, 1]; //[1,1,2,0.3];

const ledStrip = require('./dotStarStrip')();

const clearScreen = function clearScreen() {
    ledStrip.all(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    ledStrip.sync();
};

/**
 * Set pixel, but do not sync to device (LED strip)
 * @param index
 * @param colorArray
 */
const setPixel = function (index, ledColor) {
    if (index >= screenMin && index <= screenMax)
        ledStrip.set(index, ledColor[0], ledColor[1], ledColor[2], ledColor[3]);
};

/*
const r = function (rgb) {
  return rgb >> 16
};

const g = function (rgb) {
    return (rgb & 0xff00) >> 8;
};

const b = function (rgb) {
    return (rgb & 0xff);
};
*/


const toScreenCoord = (p, ratio) => {

    return screenMin + Math.floor(p * ratio);
};


const calculatePixelColor = function (color) {

    let c = color.darken(0.7);
    return [Math.round(c.red()), Math.round(c.green()), Math.round(c.blue()), defaultAlpha];
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
                setPixel(toScreenCoord(pos, ratio), calculatePixelColor(e.color.nuance));
        }
    });


    let player = world.stage.player;
    let i = 0;
    let length = player.length;

    let startPix = toScreenCoord(player.pos);
    let endPix = toScreenCoord(player.pos + (player.length - 1));
    if (Math.abs(endPix - startPix) <= 1) {
//        logger.debug('INVISIBLE! length: ' + (endPix - startPix));
        length = 3;
    }
    while (i++ < length) {
        let pos = player.pos + i;
        if (pos >= worldMin && pos < worldMax)
            setPixel(toScreenCoord(pos, ratio), calculatePixelColor(player.color.nuance));

    }

    // Render to strip
    ledStrip.sync();

};

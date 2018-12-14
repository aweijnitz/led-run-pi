/**
 * Driver to render idle mode to the DotStar LED strip.
 *
 *
 */
const util = require('util');
const Color = require('color');

const screenMax = require('../../config/gameProperties').STRIP_LENGTH;
const screenMin = 0;
const defaultAlpha = 0.3;
const bgColor = [0, 0, 0, 1]; //[1,1,2,0.3];

const ledStrip = require('./dotStarStrip')();

const clearScreen = function clearScreen() {
    ledStrip.all(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    ledStrip.sync();
};

let offscreenBuffer = new Array(screenMax);


const clearOffscreen = () => {
    for (let i = 0; i < offscreenBuffer.length; i++) {
        offscreenBuffer[i] = null;
    }
};

clearOffscreen();

/**
 * Set pixel, but do not sync to device (LED strip)
 * @param index
 * @param colorArray
 */
const setPixel = function (index, ledColor) {
    if (index >= screenMin && index <= screenMax)
        ledStrip.set(index, ledColor[0], ledColor[1], ledColor[2], ledColor[3]);
};

const calculatePixelColor = function (color) {
    let c = color.darken(0.7);
    return [Math.round(c.red()), Math.round(c.green()), Math.round(c.blue()), defaultAlpha];
};

const isVisible = (pos) => {
    return (pos >= screenMin && pos < screenMax);
};

clearScreen();


module.exports = function dotStarDemoModeRenderer(lines, logger) {

    clearScreen();
    //clearOffscreen();

    lines.forEach((line, idx) => {

        let start, end;
        if (line.velocity > 0) { // moving upwards
            start = line.pos;
            end = line.pos - line.length;
        } else { // moving top to bottom
            start = line.pos;
            end = line.pos + line.length;
        }
        if (start > end) {
            let tmp = start;
            start = end;
            end = tmp;
        }

        for (let i = start; i < end; i++) {
            if (isVisible(start + i))
                setPixel(start + i, calculatePixelColor(line.color));
        }
    });

    // Render to strip
    ledStrip.sync();
};

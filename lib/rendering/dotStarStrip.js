/**
 * Init the DotStar LED strip (hardcoded device name for now).
 *
 *
 */

const dotstar = require('dotstar');
const SPI = require('pi-spi');
const spi = SPI.initialize('/dev/spidev0.0');
const screenMax = require('../../config/gameProperties').STRIP_LENGTH;

const ledStrip = new dotstar.Dotstar(spi, {
    length: screenMax
});

module.exports = function getLedStripInstance() {
    return ledStrip;
};
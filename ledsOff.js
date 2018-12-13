const dotstar = require('dotstar');
const SPI = require('pi-spi');
const spi = SPI.initialize('/dev/spidev0.0');

const ledStrip = new dotstar.Dotstar(spi, {
    length: 144
});

ledStrip.off();
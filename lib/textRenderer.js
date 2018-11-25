const screenMax = 128;
const screenMin = 0;
const worldMax = require('./World').MAX_POS;
const worldMin= require('./World').MIN_POS;

const colToChar = (col) => {
    let result = 'e';

    switch (col) {
        case 'blue':
            result = 'b';
            break;
        case 'red':
            result = 'r';
            break;
        case 'green':
            result = 'g';
        case 'yellow':
            result = 'yellow';
            break;
        case 'white':
            result = 'w';
            break;
        default:
            return result;
    }
    return result;
};

const toScreenCoord = (p, ratio) => {

    return Math.floor(p * ratio);
};

module.exports = function textRenderer(world, logger) {

    const ratio = (screenMax - screenMin) / (worldMax - worldMin);


    let pixels = [];
    for (let i = screenMin; i < screenMax; i++) {
        pixels.push('⸰');
    }

    world.stage.enemies.forEach((e) => {
        let p = e.pos;
        while(p++ < e.pos + e.length) {
            pixels[toScreenCoord(p, ratio)] = colToChar(e.color.name);
        }
    });
    logger.debug(pixels.join(''));

};

/*


 */
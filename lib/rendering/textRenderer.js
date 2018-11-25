const screenMax = 128;
const screenMin = 0;
const worldMax = require('../World').MAX_POS;
const worldMin = require('../World').MIN_POS;

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
            break;
        case 'yellow':
            result = 'y';
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

    return screenMin + Math.floor(p * ratio);
};

module.exports = function textRenderer(world, logger) {

    const ratio = (screenMax - screenMin) / (worldMax - worldMin);


    let pixels = [];
    for (let i = screenMin; i < screenMax; i++) {
        pixels.push('⸰');
    }

    world.stage.enemies.forEach((e) => {
        let i = 0;
        let pos = 0;
        while (i++ < e.length) {
            pos = e.pos - i;
            if (pos >= worldMin && pos < worldMax)
                pixels[toScreenCoord(pos, ratio)] = colToChar(e.color.name);
        }
    });


    let player = world.stage.player;
    let i = 0;
    let pos = 0;
    while (i++ < player.length) {
        let pos = player.pos + i;
        if (pos >= worldMin && pos < worldMax)
            pixels[toScreenCoord(pos, ratio)] = colToChar(player.color.name);
    }


    // Render to screen via the logger
    logger.debug(pixels.join(''));

};

/*


 */
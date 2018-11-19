module.exports.red = () => {
    return {
        nuance: 0xff2800,
        name: 'red'
    };
};

module.exports.blue = () => {
    return {
        nuance: 0x0080ff,
        name: 'blue'
    };
};

module.exports.green = () => {
    return {
        nuance: 0xff0000,
        name: 'green'
    };
};

module.exports.yellow = () => {
    return {
        nuance: 0xffd300,
        name: 'yellow'
    };
};

module.exports.white = () => {
    return {
        nuance: 0xaaaaaa,
        name: 'white'
    };
};


// See https://stackoverflow.com/a/9085524/2736804
/*
module.exports.colorDelta = (c0, c1) => {
    let r0 = (c0 & 0xff0000) >> 16;
    let r1 = (c1 & 0xff0000) >> 16;
    let g0 = (c0 & 0x00ff00) >> 8;
    let g1 = (c1 & 0x00ff00) >> 8;
    let b0 = c0 & 0x0000ff;
    let b1 = c1 & 0x0000ff;

    let rmean = (r0 + r1) / 2;
    let r = r0 - r1;
    let g = g0 - g1;
    let b = b0 - b1;
    return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
};
*/

/**
 * To colors are the same, if they have the same name.
 *
 * @param c0
 * @param c1
 * @returns {boolean}
 */
module.exports.isSame = (c0, c1) => {
    return (c0.name === c1.name);
};
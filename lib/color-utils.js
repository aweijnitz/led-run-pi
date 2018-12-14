const Color = require('color');

module.exports.red = () => {
    return {
        nuance: Color.rgb(0xff,0x28,0x00),
        name: 'red'
    };
};

module.exports.blue = () => {
    return {
        nuance: Color.rgb(0x00,0x80,0xff),
        name: 'blue'
    };
};

module.exports.green = () => {
    return {
        nuance: Color.rgb(0x05,0xff,0x03),
        name: 'green'
    };
};

module.exports.yellow = () => {
    return {
        nuance: Color.rgb(0xff,0xd3,0x00),
        name: 'yellow'
    };
};

module.exports.white = () => {
    return {
        nuance: Color.rgb(0xa0,0xa0,0xa0),
        name: 'white'
    };
};


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
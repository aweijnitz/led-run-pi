//const textRender = require('./rendering/textRenderer');
const renderer = require('./rendering/dotStarDemoModeRenderer');
const Color = require('color');

const screenMax = require('../config/gameProperties').STRIP_LENGTH;
const screenMin = 0;

/*
const lines = [
    {
        pos: 100,
        length: 10,
        color: Color.rgb(0x00,0x80,0xff),
        velocity: 5/1000
    },
    {
        pos: screenMax,
        length: 10,
        color: Color.rgb(0x05,0xff,0x03),
        velocity: -1.0/1000
    },
    {
        pos: 40,
        length: 10,
        color: Color.rgb(0xff,0xae,0x42),
        velocity: 2.0/1000
    },
    {
        pos: screenMax,
        length: 15,
        color: Color.rgb(0x8a,0x2b,0xe2),
        velocity: -0.3/1000
    },
    {
        pos: 30,
        length: 15,
        color: Color.rgb(0x20,0xb2,0xaa),
        velocity: 5.0/1000
    },
];
*/

const lines = [
    {
        pos: 70,
        length: 15,
        color: Color.rgb(0x8a,0x2b,0xe2),
        velocity: -8/1000
    }
];

const borderCheck = (line) => {
    let start, end;
    if(line.velocity > 0) { // moving upwards
        start = line.pos;
        end = line.pos - line.length;
    } else { // moving top to bottom
        start = line.pos;
        end = line.pos + line.length;
    }

    if(start <= 0 || start >= screenMax) {
        line.velocity *= -1;
    }
};

module.exports = function demoLoop(deltaT, logger) {
    let dt = deltaT().dt;
    let startT = deltaT().startT;

    lines.forEach((line) => { line.pos += dt*line.velocity });
    lines.forEach(borderCheck);

    renderer(lines, logger);
};
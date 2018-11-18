const Enemy = require('../lib/Enemy');
const Level = require('../lib/Level');
const red = require('colors').red;
const blue = require('colors').blue;
const green = require('colors').green;
const yellow = require('colors').yellow;


/**
 * A level description consists of an array of objects.
 * Each object represents a level. Each level is passed an array of enemies.
 * Enemies have a few properties; color, start time (relative to level start time), mass (0,1].
 * @type {Array}
 */
const levels = [
    new Level([new Enemy(blue(), 200, 1), new Enemy(blue(), 2000, 1), new Enemy(yellow(), 4000, 1.5)]),
    new Level([new Enemy(green(), 200, 1), new Enemy(green(), 4000, 1), new Enemy(red(), 5000, 1)])
];


module.exports = levels;
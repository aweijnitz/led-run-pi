const Enemy = require('../lib/Enemy');
const Level = require('../lib/Level');
const red = require('../lib/colors').red;
const blue = require('../lib/colors').blue;
const green = require('../lib/colors').green;
const yellow = require('../lib/colors').yellow;

let currentId = 0;

const nextId = () => {
    return ++currentId;
};

/**
 * A level description consists of an array of objects.
 * Each object represents a level. Each level is passed an array of enemies.
 * Enemies have a few properties; color, start time (relative to level start time), id.
 * @type {Array}
 */
const levels = [
    new Level([new Enemy(blue(), 200, nextId())]),
    new Level([new Enemy(blue(), 200, nextId()), new Enemy(blue(), 2000, nextId()), new Enemy(yellow(), 4000, nextId())]),
    new Level([new Enemy(green(), 200, nextId()), new Enemy(green(), 4000, nextId()), new Enemy(red(), 5000, nextId())])
];


module.exports = levels;
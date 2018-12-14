const Enemy = require('../lib/Enemy');
const Level = require('../lib/Level');
const red = require('../lib/color-utils').red;
const blue = require('../lib/color-utils').blue;
const green = require('../lib/color-utils').green;
const yellow = require('../lib/color-utils').yellow;
const white = require('../lib/color-utils').white;

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
    new Level([new Enemy(yellow(), 100, nextId())]),
    new Level([new Enemy(blue(), 2000, nextId())]),
    new Level([new Enemy(green(), 1500, nextId())]),
    new Level([new Enemy(red(), 3500, nextId())]),
    new Level([new Enemy(yellow(), 100, nextId()), new Enemy(red(), 6000, nextId())]),
    new Level([new Enemy(blue(), 200, nextId()), new Enemy(blue(), 2000, nextId()), new Enemy(yellow(), 6500, nextId())]),

    new Level([new Enemy(white(), 200, nextId()), new Enemy(red(), 2000, nextId()), new Enemy(yellow(), 7500, nextId())]),
    new Level([new Enemy(red(), 200, nextId()), new Enemy(green(), 2000, nextId()), new Enemy(blue(), 6500, nextId())]),
    new Level([new Enemy(white(), 100, nextId()), new Enemy(yellow(), 5500, nextId()), new Enemy(yellow(), 8500, nextId()), new Enemy(white(), 11000, nextId())]),
    new Level([new Enemy(white(), 100, nextId()), new Enemy(red(), 5500, nextId()), new Enemy(blue(), 8500, nextId()), new Enemy(green(), 11000, nextId())])
];

/*

,
    new Level([new Enemy(green(), 200, nextId()), new Enemy(green(), 4000, nextId()), new Enemy(red(), 7000, nextId())])
 */

module.exports = levels;
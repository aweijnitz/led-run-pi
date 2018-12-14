const colors = require('../lib/color-utils');

// Distances in CM
const zones = [
    {
        color: colors.red(),
        min: 5,
        max: 15
    },
    {
        color: colors.green(),
        min: 16,
        max: 35
    },
    {
        color: colors.blue(),
        min: 36,
        max: 55
    },
    {
        color: colors.yellow(),
        min: 56,
        max: 75
    },
    {
        color: colors.white(),
        min: 76,
        max: 100
    }
];

module.exports = zones;
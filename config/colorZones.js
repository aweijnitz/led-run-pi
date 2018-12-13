const colors = require('../lib/colors');

// Distances in CM
const zones = [
    {
        color: colors.red(),
        min: 5,
        max: 10
    },
    {
        color: colors.green(),
        min: 11,
        max: 20
    },
    {
        color: colors.blue(),
        min: 22,
        max: 35
    },
    {
        color: colors.yellow(),
        min: 36,
        max: 90
    },
];

module.exports = zones;
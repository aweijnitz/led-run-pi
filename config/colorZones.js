const colors = require('../lib/colors');

// Distances in CM
const zones = [
    {
        color: colors.red(),
        min: 10,
        max: 30
    },
    {
        color: colors.green(),
        min: 31,
        max: 50
    },
    {
        color: colors.blue(),
        min: 51,
        max: 70
    },
    {
        color: colors.yellow(),
        min: 71,
        max: 90
    },
];

module.exports = zones;
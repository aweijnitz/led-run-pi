const colors = require('./colors');
const zones = require('../config/colorZones');


/**
 * Is point inside an interval
 * @param p
 * @param i0
 * @param i1
 * @return {boolean}
 */
const inside = function inside(p, i0, i1) {
    if (i0 > i1) {
        let tmp = i1;
        i1 = i0;
        i0 = tmp;
    }
    return p >= i0 && p <= i1;
};
module.exports.inside = inside;

/**
 * Maps a distance to a color object from the zones array.
 *
 * @param dist - distance to be mapped to the
 * @param zones - array of configured color zones
 * @return Color {{nuance, name}}
 */
module.exports.toColor = (dist, zones_) => {
    let col = colors.red();
    if (dist < 9)
        return col;

    let zone = undefined;
    for (let i = 0; i < zones.length; i++) {
        let z = zones[i];
        if (inside(dist, z.min, z.max)) {
            zone = z;
            break;
        }
    }

    if (zone !== undefined)
        col = zone.color;

    return col;
};
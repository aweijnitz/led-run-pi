
module.exports.red = () => {
    return 0xff2800;
};

module.exports.blue = () => {
    return 0x0080ff;
};

module.exports.green = () => {
    return 0xff0000;
};

module.exports.yellow = () => {
    return 0xffd300;
};

// See https://stackoverflow.com/a/9085524/2736804
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

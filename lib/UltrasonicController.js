/** Interface to the HC-SR04 Ultrasonic controller.

 Only works on an actual Raspberry Pi

 This controller makes use of the code examples provided here.
 See https://www.npmjs.com/package/pigpio#measure-distance-with-a-hc-sr04-ultrasonic-sensor

 */
const Gpio = require('pigpio').Gpio; // NOTE: Only works on an actual Pi.

const colors = require('./colors');
const zones = require('../config/colorZones');
const pins = require('../config/GPIO-pins');
const inside = require('./utils').inside;
const toColor = require('./utils').toColor();


const MICROSECDONDS_PER_CM = (1e6 / 34321) * 0.5; // 0.5 because we are measuring the distance (half the total travel time of the sound)
const trigger = new Gpio(pins.SR04_TRIGGER_PIN, {mode: Gpio.OUTPUT});
const echo = new Gpio(pins.SR04_ECHO_PIN, {mode: Gpio.INPUT, alert: true});


const watchHCSR04 = (controller) => {
    let startTick;

    echo.on('alert', (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            controller.distance = diff / MICROSECDONDS_PER_CM;
            controller.currentColor = toColor(diff, zones);
        }
    });
};

trigger.digitalWrite(0); // Make sure trigger is low

module.exports = class UltrasonicController {
    constructor(pollingInterval = 100, logger) {
        this.pollingInterval = pollingInterval;
        this.currentColor = colors.yellow();
        this.distance = -1;
        this.timer = -1;
        this.logger = logger;
        watchHCSR04(this); // Setup
    }

    start() {
        this.logger.info('Starting ultrasonic controller.');
        this.timer = setInterval(() => {
            trigger.trigger(10, 1); // Set trigger high for 10 microseconds. See timing diagram. https://www.robot-electronics.co.uk/images/srf04timing.gif
        }, this.pollingInterval);
    }

    stop() {
        this.logger.info('Stopping ultrasonic controller.');
        clearInterval(this.timer);
        this.timer = -1;
    }

    isRunning() {
        return this.timer !== -1;
    }

    getCurrentColor() {
        return this.currentColor;
    }

    getCurrentDistance() {
        return this.distance;
    }
};
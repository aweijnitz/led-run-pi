const colors = require('./colors');

module.exports = class DevelopmentController {
    constructor(pollingInterval) {
        this.pollingInterval = pollingInterval;
        this.currentColor = colors.yellow();
        this.colorIndex = 0;
        this.colors = [colors.red(), colors.green(), colors.blue()];
        this.timer = -1;
    }

    start() {
        this.timer = setInterval((that) => {
            that.currentColor = that.colors[that.colorIndex];
            that.colorIndex++;
            that.colorIndex %= that.colors.length;
        }, this.pollingInterval, this);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = -1;
    }

    isRunning() {
        return this.timer === -1;
    }

    getCurrentColor() {
        return this.currentColor;
    }
};
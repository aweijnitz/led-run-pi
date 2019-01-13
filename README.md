# LED Run Pi
A simple 1d game for Raspberry Pi, using a DotStar LED strip as display.
Guide a small worm to the other end of the LED strip by matching its color
with the color of oncoming worms, going in the opposite direction.

## Project status
Basic gameplay in place. Needs a lot of polishing and some good refactoring. :-)

## Needed software and hardware

- Raspberry Pi
- HC-SR04 ultrasonic sensor
- DotStar LED Strip
- Node.js v6 (see compatibility node below)

## Installing and Running

_Developed on a Raspberry Pi 3, Model B_

``./install-Pi-specific-libs.sh && npm install && ./run.sh``

## Run Tests

``npm test``

## Connecting the peripherials


### DotStar LED strip

Via a level-shifter, connect the **DotStar DAT to Pi GPIO 10** and
the **DotStar CLK to Pi GPIO 11**.

For details, see [The Adafruit instruction](https://learn.adafruit.com/dotstar-pi-painter/assembly-part-1).

Note, you need to hook up a quite beefy power brick to power the LED strip, at least 10A will be needed to handle the 
power draw of a lot of pixels firing at the same time. I ended up ordering a 5V, 15A brick. Should cover most scenarios.

### Enable SPI on the Pi3

In /boot/config.txt, uncommend the dtparam line to enable spi, like so:

```
# Uncomment some or all of these to enable the optional hardware interfaces
#dtparam=i2c_arm=on
#dtparam=i2s=on
dtparam=spi=on
```

### Ultrasonic sensor

Hook up the **senor ECHO pin to Pi GPIO17** and **sensor TRIGGER pin to Pi GPIO04**.

If those are not free, use other pins and set the corresponding pin numbers in ```./config/GPIO-pins.js```.


## Compatibility Note - Why such old Node.js (v8)?
The library used to interface with the ultrasonic sensor (HC-SR04) uses a depricated API and was not functioning properly with the latest Node.js for me.

## TODO

1. Write game engine, (__DONE__)
2. Connect HC-SR04 ultrasonic sensor (__PoC__ working outside this repo)
3. Buy [DotStar LED Strip](https://www.adafruit.com/product/2242) (__DONE__ *Black friday hooray!*)
4. Connect DotStar LED Strip (__DONE__)
4. Write display logic to render game to DotStar strip (__DONE__)
5. Compose levels (__DONE__ *minimal*)
6. Clean code and build robust case
7. Tweak difficulty
8. Done!


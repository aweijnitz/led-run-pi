# LED Run Pi
A simple 1d game for Raspberry Pi, using a DotStar LED strip as display.
Guide a small worm to the other end of the LED strip by matching its color
with the color of oncoming worms, going in the opposite direction.

## Project status
Just beginning. Lots of ideas. Very little to show. The usual. :-)

## Needed software and hardware

- Raspberry Pi
- HC-SR04 ultrasonic sensor
- DotStar LED Strip
- Node.js v6 (see compatibility node below)

## Installing and Running

``./install-Pi-specific-libs.sh && npm install && ./run.sh``

## Run Tests

``npm test``

## Connecting the peripherials


### DotStar LED strip

Via a level-shifter, connect the **DotStar DAT to Pi GPIO 10** and
the **DotStar CLK to Pi GPIO 11**.

For details, see [The Adafruit instruction](https://learn.adafruit.com/dotstar-pi-painter/assembly-part-1).

Note, you need to hook up a quite beefy power brick to power the LED strp, at least 10A will be needed to handle the 
power draw of a lot of pixels firing at the same time. 

### Ultrasonic sensor

Hook up the **senor ECHO pin to Pi GPIO17** and **sensor TRIGGER pin to Pi GPIO04**.

If those are not free, use other pins and set the corresponding pin numbers in ```./config/GPIO-pins.js```.


## Compatibility Note - Why such old Node.js (v6)?
The library used to interface with the ultrasonic sensor (HC-SR04) uses a depricated API and was not functioning properly with the latest Node.js for me.

## TODO

1. Write game engine, (__DONE__)
2. Connect HC-SR04 ultrasonic sensor (__PoC__ working outside this repo)
3. Buy [DotStar LED Strip](https://www.adafruit.com/product/2242) (__DONE__ *Black friday hooray!*)
4. Connect DotStar LED Strip
4. Write display logic to render game to DotStar strip
5. Compose levels
6. Tweak difficulty
7. Done!


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

## Intalling and Running

``npm install && ./run.sh``

## Run Tests

``npm test``


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


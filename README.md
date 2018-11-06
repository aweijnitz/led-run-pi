# LED Run Pi
A simple 1d game for Raspberry Pi, using a DotStar LED strip as display.
Guide a small worm to the other end of the LED strip by matching its color
with the color of oncoming worms, going in the opposite direction.

## Project status
Just beginning. Lots of ideas. Very little to show. The usual. :-)

## Needed hardware

- Raspberry Pi
- HR-SR04 ultrasonic sensor
- DotStar LED Strip

## Running

``./run.sh``


## Why such old Node.js (v6)?
The library used to interface with the ultrasonic sensor (HC-SR04) uses a depricated API and was not functioning properly with the latest Node.js for me.

## TODO

1. Write game engine
2. Connect HR-SR04 ultrasonic sensor
3. Buy DotStar LED Strip and connect
4. Write display logic to render game to DotStar strip
5. Compose levels
6. Tweak difficulty
7. Done!


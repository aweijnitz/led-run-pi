const initLogger = require('./lib/initLogger');
const gameLoop = require('./lib/gameLoop');
const renderLoop = require('./lib/renderLoop');
const demoLoop = require('./lib/demoLoop');

const levels = require('./config/levels');
const World = require('./lib/World').World;
const Controller = require('./lib/UltrasonicController');
let controller = undefined;



const GAME_RUNNING = 0;
const GAME_STARTING = 1;
const GAME_OVER = 2;
const GAME_DEMO_LOOP_STARTING = 3;
const GAME_DEMO_LOOP = 4;

// SETUP
//
const conf = {
    logDir: './logs',
    gameLoopDelayMs: 1000 / 40, // 40 Hz
    renderLoopDelayMs: 1000 / 50 // 50 FPS
};
const logger = initLogger(conf);

let world = undefined;
const initWorld = function initWorld(levels, logger, gameSpeed) {
    world = new World(levels, logger, gameSpeed);
    return world;
};



logger.info('App starting');

if(!controller) {
    controller = new Controller(100, logger);
    controller.start();
}

// Init display
//
logger.info('Init display');

//clearScreen();

// Wait for game to start (run demo mode, poll sensor)
//


let forever = 0;
let state = GAME_DEMO_LOOP_STARTING;
let gameLoopId = 0;
let demoLoopId = 0;
let renderLoopId = 0;

// Be nice process citizen and respect OS signals
process.on('SIGTERM', function () {
    clearInterval(gameLoopId);
    clearInterval(forever);
    //clearScreen();
    console.log('SHUTDOWN (TERMINATED)');
    process.exit(0);
});
process.on('SIGINT', function () {
    clearInterval(gameLoopId);
    clearInterval(forever);
    //clearScreen();
    console.log('SHUTDOWN (INTERRUPTED)');
    process.exit(0);
});

let oldT = Date.now();
let startT = Date.now();
let gameStarted = oldT;
let gameSpeed = 1.0;
let currentLevel = 0;
let startGameTriggerTimout = 5*1000;
let isTrackingGameTrigger = false;

forever = setInterval(() => {

    switch (state) {
        case GAME_OVER:
            logger.info('Game over');
            gameSpeed = 1.0;
            clearInterval(gameLoopId);
            clearInterval(renderLoopId);

            // TODO: Display game over transition, then switch state to demo loop
            //clearScreen();
            state = GAME_DEMO_LOOP_STARTING;

            break;
        case GAME_DEMO_LOOP_STARTING:
            logger.info('Starting demo loop');
            oldT = Date.now();
            startT = Date.now();
            demoLoopId = setInterval(demoLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return { dt: dt, startT: startT };
                }, logger);
            //renderLoopId = setInterval(renderLoop, conf.renderLoopDelayMs, world, logger);
            state = GAME_DEMO_LOOP;
            break;
        case GAME_DEMO_LOOP:
            // CHeck for game start
            let dist = controller.getCurrentDistance();
            if(dist < 3 && !isTrackingGameTrigger) {
                isTrackingGameTrigger = true;
                startT = Date.now();
            } else if (dist > 3 && isTrackingGameTrigger && Date.now() < (startT + startGameTriggerTimout)) {
                isTrackingGameTrigger = false;
            } else if (dist < 3 && isTrackingGameTrigger && Date.now() >= (startT + startGameTriggerTimout)) {
                isTrackingGameTrigger = false;
                clearInterval(demoLoopId);
                state = GAME_STARTING;
                logger.info('Player ready! Preparing to start game.');
            }
            break;
        case GAME_STARTING:
            // Player started game
            // - Init world, display game begin transition, then clear screen

            // Start Game Loop!
            //
            logger.info('Starting game. LEVEL: ' + currentLevel);
            //clearScreen();
            world = initWorld(levels, logger, gameSpeed);
            world.initLevel(currentLevel);
            oldT = Date.now();
            gameLoopId = setInterval(gameLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return dt;
                }, world, controller, logger);
            clearInterval(renderLoopId); // Kill demo loop
            renderLoopId = setInterval(renderLoop, conf.renderLoopDelayMs, world, logger);
            state = GAME_RUNNING;
            break;
        case GAME_RUNNING:

            if (world.isLevelComplete() && (world.levelsRemaining() >= 1)) {
                currentLevel = world.initLevel(world.nextLevel(gameSpeed));
                logger.info('Next Level! LEVEL: ' + currentLevel);
            } else if (world.isLevelComplete() && (world.levelsRemaining() < 1)) {
                gameSpeed *= 0.9;
                currentLevel = 0;
                //world = initWorld(levels, logger, gameSpeed);
                world.reset();
                world.initLevel(currentLevel, gameSpeed);
                logger.info('ALL LEVELS COMPLETED! Speed up! LEVEL: ' + currentLevel);
            } else if (world.isGameOver()) {
                clearInterval(gameLoopId);
                clearInterval(renderLoopId);
                state = GAME_OVER;
            }
            break;
        default:
            break;
    }

}, 5);

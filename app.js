const initLogger = require('./lib/initLogger');
const gameLoop = require('./lib/gameLoop');
const renderLoop = require('./lib/renderLoop');
const levels = require('./config/levels');
const World = require('./lib/World').World;

const GAME_RUNNING = 0;
const GAME_STARTING = 1;
const GAME_OVER = 2;
const GAME_DEMO_LOOP = 3;

// SETUP
//
const conf = {
    logDir: './logs',
    gameLoopDelayMs: 1000/40, // 40 Hz
    renderLoopDelayMs: 1000/50 // 60 FPS
};
const logger = initLogger(conf);

let world = undefined;
const initWorld = function initWorld(levels, logger, gameSpeed) {
    world = new World(levels, logger, gameSpeed);
    return world;
};

logger.info('App starting');


// Init display
//
logger.info('Init display');

// TODO: Clear LED strip and set to black.

// Wait for game to start (run demo mode, poll sensor)
//


let forever = 0;
let state = GAME_STARTING; // TODO: Should eventually start in GAME_DEMO_LOOP
let gameLoopId = 0;
let demoLoopId = 0;
let renderLoopId = 0;

// Be nice process citizen and respect OS signals
process.on('SIGTERM', function () {
    clearInterval(gameLoopId);
    clearInterval(forever);
    console.log('SHUTDOWN (TERMINATED)');
    process.exit(0);
});
process.on('SIGINT', function () {
    clearInterval(gameLoopId);
    clearInterval(forever);
    console.log('SHUTDOWN (INTERRUPTED)');
    process.exit(0);
});

let oldT = Date.now();
let gameStarted = oldT;
let gameSpeed = 1.0;
let currentLevel = 0;
forever = setInterval(() => {

    switch (state) {
        case GAME_OVER:
            logger.info('Game over');
            gameSpeed = 1.0;
            clearInterval(gameLoopId);
            clearInterval(renderLoopId);

            // TODO: Display game over transition, then switch state to demo loop
            logger.info('Starting demo loop');
            oldT = Date.now();
            demoLoopId = setInterval(gameLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return dt;
                }, world, logger);
            renderLoopId = setInterval(renderLoop, conf.renderLoopDelayMs, world, logger);
            state = GAME_DEMO_LOOP;
            break;
        case GAME_DEMO_LOOP:
            break;
        case GAME_STARTING:
            // Player started game
            // - Init world, display game begin transition, then clear screen

            // Start Game Loop!
            //
            logger.info('Starting game');
            world = initWorld(levels, logger, gameSpeed);
            world.initLevel(currentLevel);
            oldT = Date.now();
            gameLoopId = setInterval(gameLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return dt;
                }, world, logger);
            renderLoopId = setInterval(renderLoop, conf.renderLoopDelayMs, world, logger);
            state = GAME_RUNNING;
            break;
        case GAME_RUNNING:

            if (world.isLevelComplete() && (world.levelsRemaining() >= 1)) {
                currentLevel = world.initLevel(world.nextLevel(gameSpeed));
            } else if (world.isLevelComplete() && (world.levelsRemaining() < 1)) {
                gameSpeed *= 0.9;
                world = initWorld(levels, logger, gameSpeed);
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

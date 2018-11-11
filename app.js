const initLogger = require('./lib/initLogger');
const gameLoop = require('./lib/gameLoop');
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
    gameLoopDelayMs: 40 // 25 FPS
};
const logger = initLogger(conf);

let worldState = undefined;
const initWorld = function initWorld(levels, logger, gameSpeed) {
    worldState = new World(levels, logger, gameSpeed);
    return worldState;
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
            // TODO: Display game over transition, then switch state to demo loop
            logger.info('Starting demo loop');
            oldT = Date.now();
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
            worldState = initWorld(levels, logger, gameSpeed);
            worldState.initLevel(currentLevel);
            oldT = Date.now();
            gameLoopId = setInterval(gameLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return dt;
                }, worldState, logger);
            state = GAME_RUNNING;
            break;
        case GAME_RUNNING:
            if (Date.now() - gameStarted > 7000) { // For development
                logger.info('Game timeout');
                state = GAME_OVER;
            }

            if (worldState.levelComplete() && (worldState.levelsRemaining() >= 1)) {
                currentLevel = worldState.initLevel(worldState.nextLevel(gameSpeed));
            } else if (worldState.levelComplete() && (worldState.levelsRemaining() < 1)) {
                gameSpeed *= 0.9;
                worldState = initWorld(levels, logger, gameSpeed);
            } else if (worldState.isGameOver()) {
                state = GAME_OVER;
            }
            break;
        default:
            break;
    }

}, 10);

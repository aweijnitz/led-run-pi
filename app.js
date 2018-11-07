const initLogger = require('./lib/initLogger');
const gameLoop = require('./lib/gameLoop');

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

logger.info('App starting');

// Load levels
//
logger.info('Loading levels');


// Init display
//
logger.info('Init display');


// Wait for game to start (run demo mode, poll sensor)
//


let forever = 0;
let state = GAME_STARTING; // TODO: Should eventually start in GAME_DEMO_LOOP
let gameLoopId = 0;
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
let gameSpeed = 1.0; // TODO: Speed factor to increase if player completes all levels and game starts over
forever = setInterval(() => {

    switch (state) {
        case GAME_OVER:
            logger.info('Game over');
            clearInterval(gameLoopId);
            state = GAME_DEMO_LOOP;
            break;
        case GAME_DEMO_LOOP:
            break;
        case GAME_STARTING:
            // Player started game
            // - Init world, display game begin transition, then clear screen

            // Game Loop!
            //
            logger.info('Starting game');
            gameLoopId = setInterval(gameLoop, conf.gameLoopDelayMs,
                () => {
                    let now = Date.now();
                    let dt = now - oldT;
                    oldT = now;
                    return dt;
                }, logger);
            state = GAME_RUNNING;
            break;
        case GAME_RUNNING:
            if(Date.now() - gameStarted > 3000)
                state = GAME_OVER;
            break;
        default:
            break;
    }

}, 10);

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
let mode = GAME_STARTING;
let gameLoopId = 0;
process.on('SIGTERM', function () {
    clearInterval(forever);
    console.log('SHUTDOWN (TERMINATED)');
    process.exit(0);
});
process.on('SIGINT', function () {
    clearInterval(forever);
    console.log('SHUTDOWN (INTERRUPTED)');
    process.exit(0);
});

let oldT = Date.now();
let gameStarted = oldT;
forever = setInterval(() => {

    switch (mode) {
        case GAME_OVER:
            logger.info('Game over');
            clearInterval(gameLoopId);
            gameLoopId = 0;
            mode = GAME_DEMO_LOOP;
            break;
        case GAME_DEMO_LOOP:
            break;
        case GAME_STARTING:
            // Player started game
            // - Init world, display game begin transition, then clear screen
            // Init World
            //

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
            mode = GAME_RUNNING;
            break;
        case GAME_RUNNING:
            if(Date.now() - gameStarted > 3000)
                mode = GAME_OVER;
            break;
        default:
            break;
    }


}, 10);

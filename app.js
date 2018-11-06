const winston = require('winston'); // https://github.com/winstonjs/winston
const makeDir = require('make-dir');

// SETUP
//
const conf = {
    logDir: './logs',
    gameLoopDelayMs: 40 // 25 FPS
};

makeDir.sync(conf.logDir);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({filename: conf.logDir + '/error.log', level: 'error'}),
        new winston.transports.File({filename: conf.logDir + '/combined.log'})
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

logger.info('App starting');

// Load levels
//
logger.info('Loading levels');


// Init display
//
logger.info('Init display');


// Wait for game to start (run demo mode, poll sensor)
//
const GAME_RUNNING = 0;
const GAME_STARTING = 1;
const GAME_OVER = 2;
const GAME_DEMO_LOOP = 3;

let forever = 0;
let mode = GAME_STARTING;
let gameLoopId = 0;


process.on('SIGTERM', function () {
    clearInterval(forever);
});

const gameLoop = (dt, logr) => {
    logr.info('GAME LOOP ' + dt());
};

let oldT = Date.now();
let gameStarted = oldT;
setInterval(() => {

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

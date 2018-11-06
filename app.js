const winston = require('winston'); // https://github.com/winstonjs/winston
const makeDir = require('make-dir');

// SETUP
//
const conf = {
    logDir: './logs'
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
        new winston.transports.File({ filename: conf.logDir + '/error.log', level: 'error' }),
        new winston.transports.File({ filename: conf.logDir + '/combined.log' })
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





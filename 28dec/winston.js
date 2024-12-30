const winston = require('winston');
const {combine, timestamp, json, printf, align, colorize} = winston.format;
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'http',
    format: combine(
        colorize({all:true}),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS,A',
        }),
        align(),
        printf((info)=>`[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.File({
        filename: 'combined.log',
    }),
],
});

logger.error('error message');  //level 0
logger.warn('warn message');    //level 1
logger.info('info message');    //level 2
logger.http('http message');
logger.verbose('verbose');
logger.debug('debug message');
logger.silly('silly message');

//level: process.env.LOG_LEVEL || 'debug'
import winston from 'winston';

const winstonLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'all.log' })
    ]
});

export default winstonLogger;
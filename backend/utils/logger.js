import winston from "winston";
import 'winston-daily-rotate-file'
const logLevel = 'http';
const rotateTransportHttp = new winston.transports.DailyRotateFile({
    level: logLevel,
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10k',
    maxFiles: '2',
    handleExceptions: true,
})

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize()
    ),
    transports: [
        rotateTransportHttp,
        new winston.transports.Console({
            level:'http'
        })
    ]
});

export default logger;

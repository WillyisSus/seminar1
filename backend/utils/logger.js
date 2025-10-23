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

// const rotateTransportError = new winston.transports.DailyRotateFile({
//     level: 'error',
//     filename: './logs/error-%DATE%.log',
//     datePattern: 'YYYY-MM-DD-HH',
//     zippedArchive:true,
//     maxSize:'1k',
//     maxFiles:'2',
//     handleExceptions:true
// })

// const rotateTransportWarn = new winston.transports.DailyRotateFile({
//     level: 'warn',
//     filename: './logs/warn-%DATE%.log',
//     datePattern: 'YYYY-MM-DD-HH',
//     zippedArchive:true,
//     maxSize:'1k',
//     maxFiles:'2',
//     handleExceptions:true
// })
// rotateTransportWarn.on('error', (error) => {
//     console.log(error)
// })
// rotateTransportHttp.on('error', (error) => {
//     console.log(error)
// })

// rotateTransportError.on('error', (error) => {console.log(error)})
const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        // winston.format.printf((info) => `${info.message}`)
    ),
    transports: [

        rotateTransportHttp
    ]
});

export default logger;

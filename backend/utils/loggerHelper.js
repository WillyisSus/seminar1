import morgan from "morgan";
import logger from "./logger.js"

morgan.token('req-body', function(req, res){return JSON.stringify(req.body?req.body:'')})
const morganHttpHelper = morgan((tokens, req, res ) => {
    return  [
    tokens.status(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['req-body'](req, res)
  ].join(' ')
}, {
    stream: {
        write: (message) => {
            const statusCode = parseInt(message.split(' ')[0])
            console.log(message)
            if (statusCode >= 500){
                logger.error(message)
            }else if (statusCode >= 400){
                logger.warn(message)
            }else {
                logger.http(message)
            }
        }
    }
}) 


export default morganHttpHelper;
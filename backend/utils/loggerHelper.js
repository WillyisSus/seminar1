import morgan from "morgan";
import logger from "./logger.js"
import { Json } from "sequelize/lib/utils";

morgan.token('req-body', function(req, res){return JSON.stringify(req.body?req.body:'')})
const morganHttpHelper = morgan((tokens, req, res ) => {
    return  JSON.stringify({
        status: tokens.status(req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        responseTime: tokens['response-time'](req, res)+'ms',
        reqBody: tokens['req-body'](req, res)
    })
    
  
}, {
    stream: {
        write: (message) => {
            const {status, method, url, contentLength, responseTime, reqBody} = JSON.parse(message)
            if (status >= 500){
                logger.error(`${status} ${method} ${url}`, {contentLength, responseTime, reqBody})
            }else if (status >= 400){
                logger.warn(`${status} ${method} ${url}`, {contentLength, responseTime, reqBody})
            }else {
                logger.http(`${status} ${method} ${url}`, {contentLength, responseTime, reqBody})
            }
        }
    }
}) 


export default morganHttpHelper;
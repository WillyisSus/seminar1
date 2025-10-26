import morgan from "morgan";
import logger from "../utils/logger.js"
morgan.token('ip', function(req, res) {return req?.ip})
morgan.token('req-body', function(req, res){return JSON.stringify(req.body?req.body:'')})
const loggerHelper = morgan((tokens, req, res ) => {
    return  JSON.stringify({
        status: tokens.status(req, res),
        method: tokens.method(req, res),
        reqIP: tokens['ip'](req, res),
        url: tokens.url(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        responseTime: tokens['response-time'](req, res)+'ms',
        reqBody: tokens['req-body'](req, res)
    })
    
  
}, {
    stream: {
        write: (message) => {
            const {status, method, reqIP, url, contentLength, responseTime, reqBody} = JSON.parse(message)
            if (status >= 500){
                logger.error(`${status} ${method} ${url}`, {reqIP, contentLength, responseTime, reqBody})
            }else if (status >= 400){
                logger.warn(`${status} ${method} ${url}`, {reqIP, contentLength, responseTime, reqBody})
            }else {
                logger.http(`${status} ${method} ${url}`, {reqIP, contentLength, responseTime, reqBody})
            }
        }
    }
}) 


export default loggerHelper;
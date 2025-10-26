import morgan from "morgan";
import logger from "../utils/logger.js"
morgan.token('ip', function(req, res) {return req?.ip})
morgan.token('req-user', function(req, res) { 
    const user = req?.user || ''
    return user})
morgan.token('req-body', function(req, res){return JSON.stringify(req.body?req.body:'')})
const loggerHelper = morgan((tokens, req, res ) => {
    console.log("Morgan: ", req?.user)
    return  JSON.stringify({
        status: tokens.status(req, res),
        method: tokens.method(req, res),
        reqIP: tokens['ip'](req, res),
        reqUser: tokens['req-user'](req, res),
        url: tokens.url(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        responseTime: tokens['response-time'](req, res)+'ms',
        reqBody: tokens['req-body'](req, res)
    })
    
  
}, {
    stream: {
        write: (message) => {
            const {status, method, reqIP, reqUser, url, contentLength, responseTime, reqBody} = JSON.parse(message)
            if (status >= 500){
                logger.error(`${status} ${method} ${url}`, {reqIP, reqUser, contentLength, responseTime, reqBody})
            }else if (status >= 400){
                logger.warn(`${status} ${method} ${url}`, {reqIP, reqUser, contentLength, responseTime, reqBody})
            }else {
                logger.http(`${status} ${method} ${url}`, {reqIP, reqUser, contentLength, responseTime, reqBody})
            }
        }
    }
}) 


export default loggerHelper;
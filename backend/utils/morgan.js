import logger from "./logger.js"
 const morganHttpHelper = (req, res, next) => {
    const message = `${req.ip} - "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${res.statusCode}`;
    res.on('finish', () => {
        if (res.statusCode >= 500){
            logger.error(message)
        }else if (res.statusCode >= 400){
            logger.warn(message)
        }else {
            logger.http(message)
        }
    })
    next();
}


export default morganHttpHelper;
const { constants } = require('../constants');

const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {

        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation Failed',
                statusCode: statusCode,
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;


        case constants.NOT_FOUND:
            res.json({
                title: 'Not found',
                statusCode: statusCode,
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;


        case constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                statusCode: statusCode,
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;


        case constants.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                statusCode: statusCode,
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;


        case constants.SERVER_ERROR:
            res.json({
                title: 'Server Error',
                statusCode: statusCode,
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;

        default:
            console.log('No Error, All good!');
            break;


    }
}


module.exports = errorHandler;
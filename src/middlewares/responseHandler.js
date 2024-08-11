const responseHandler = (req, res, next) => {

    res.sendSuccess = (status = 200, message = '', data = null) => {
        res.status(status).json({
            status: 'success',
            message,
            data
        });
    };

    res.sendError = (status = 500, message = 'Internal server error', error = null) => {
        res.status(status).json({
            status: 'error',
            message,
            error
        });
    };

    next();

};

module.exports = responseHandler;
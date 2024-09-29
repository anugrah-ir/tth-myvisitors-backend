const sendResponse = {
    success: (res, statusCode = 200, message = 'Success', data = {}) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    },
  
    error: (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }
};

module.exports = sendResponse;
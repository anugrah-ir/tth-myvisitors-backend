const success = (res, code, status, message, data) => res.status(code).json({
    status,
    message,
    data
});

const error = (res, code, status, message) => res.status(code).json({
    status,
    message
});

module.exports = {
    success,
    error
}
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = 'Bad Request';
    }
};

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = 'Unauthorized';
    }
};

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = 'Not Found';
    }
};

module.exports = {
    BadRequestError,
    UnauthorizedError,
    NotFoundError
};
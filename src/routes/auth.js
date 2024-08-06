const express = require('express');
const authRoute = express.Router();

const {
    register,
    login
} = require('../controllers/auth');

authRoute
    .post('/register', register)
    .post('/login', login);

module.exports = authRoute;
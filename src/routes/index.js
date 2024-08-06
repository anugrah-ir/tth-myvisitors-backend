const express = require('express');
const routes = express.Router();

const userRoute = require('./user');
const authRoute = require('./auth');

routes
    .use('/user', userRoute)
    .use('/auth', authRoute);

module.exports = routes;
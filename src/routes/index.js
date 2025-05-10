const express = require('express');
const routes = express.Router();

const authRoute = require('./auth');
const userRoute = require('./user');
const roomRoute = require('./room');
const accessRoute = require('./access');
const visitRoute = require('./visit');

routes
    .use('/auth', authRoute)
    .use('/user', userRoute)
    .use('/room', roomRoute)
    .use('/access', accessRoute)
    .use('/visit', visitRoute);

module.exports = routes;
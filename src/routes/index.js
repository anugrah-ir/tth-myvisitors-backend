const express = require('express');
const routes = express.Router();

const authRoute = require('./auth');
const accessRoute = require('./access');

routes
    .use('/auth', authRoute)
    .use('/access', accessRoute);

module.exports = routes;
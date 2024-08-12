const express = require('express');
const routes = express.Router();

const authRoute = require('./auth');

routes
    .use('/auth', authRoute);

module.exports = routes;
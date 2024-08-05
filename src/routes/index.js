const express = require('express');
const routes = express.Router();

const userRoute = require('./user');

routes.
    use('/user', userRoute);

module.exports = routes;
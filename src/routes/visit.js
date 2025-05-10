const express = require('express');
const visitRoute = express.Router();

const {
    addVisit,
    getAllVisits
} = require('../controllers/visit');

visitRoute
    .post('/', addVisit)
    .get('/', getAllVisits);

module.exports = visitRoute;
const express = require('express');
const accessRoute = express.Router();
const upload = require('../middlewares/uploader');

const {
    addAccess
} = require('../controllers/access');

accessRoute
    .post('/add', upload.single('file'), addAccess);

module.exports = accessRoute;
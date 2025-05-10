const express = require('express');
const accessRoute = express.Router();
const upload = require('../middlewares/uploader');

const {
    addAccess,
    getAllAccessByUserID
} = require('../controllers/access');

accessRoute
    .post('/', upload.single('file'), addAccess)
    .get('/', getAllAccessByUserID);

module.exports = accessRoute;
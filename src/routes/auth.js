const express = require('express');
const authRoute = express.Router();
const upload = require('../middlewares/uploader');

const {
    register,
    login
} = require('../controllers/auth');

authRoute
    .post('/register', upload.single('selfiePhoto'), register)
    .post('/login', login);

module.exports = authRoute;
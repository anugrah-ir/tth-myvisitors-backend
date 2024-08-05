const express = require('express');
const userRoute = express.Router();

const {
    createUser,
    findUserByID,
    updateUserByID,
    deleteUserByID
} = require('../controllers/user');

userRoute
    .post('/', createUser)
    .get('/:id', findUserByID)
    .put('/:id', updateUserByID)
    .delete('/:id', deleteUserByID);

module.exports = userRoute;
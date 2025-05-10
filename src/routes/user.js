const express = require('express');
const userRoute = express.Router();

const {
    getUserByID,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/user');

userRoute
    .get('/profile', getUserByID)
    .get('/all', getAllUsers)
    .put('/update', updateUser)
    .delete('/delete', deleteUser);

module.exports = userRoute;
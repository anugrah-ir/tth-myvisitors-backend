const { where } = require('sequelize');
const sendResponse = require('../middlewares/responseHandler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return sendResponse.success(res, 200, 'All Users:', users);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const getUserByID = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = data.id;
        const user = await User.findOne({ where: { id: id }});
        if (!user) {
            return sendResponse.error(res, 404, 'User Not Found');
        }

        return sendResponse.success(res, 200, 'User Found.', user);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id, name } = req.body;

        const user = await User.findOne({ where: { id: id }});
        if (!user) {
            return sendResponse.error(res, 404, 'User Not Found');
        }

        const updatedUser = await user.update({ name });
        return sendResponse.success(res, 200, 'User Updated Successfully', updatedUser);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findOne({ where: { id: id }});
        if (!user) {
            return sendResponse.error(res, 404, 'User Not Found');
        }

        await user.destroy();
        return sendResponse.success(res, 200, 'User Deleted Successfully', user);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    getUserByID,
    getAllUsers,
    updateUser,
    deleteUser
}
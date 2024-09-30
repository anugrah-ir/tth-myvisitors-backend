const sendResponse = require('../middlewares/responseHandler');
const User = require('../models/user');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
};

const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role, companyIDPhoto, integrityPact } = req.body;

        const isEmailValid = emailValidator.validate(email);
        if (!isEmailValid) {
            return sendResponse.error(res, 400, 'The email address is invalid');
        }

        const isEmailRegistered = await User.findOne({ where: { email: email }});
        if (isEmailRegistered) {
            return sendResponse.error(res, 409, 'The email is already registered');
        }
          
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await user.create({ name, email, password: hashedPassword, phoneNumber, selfiePhoto: req.file.path, role, companyIDPhoto, integrityPact });
        const token = generateToken(user.id);
        return sendResponse.success(res, 200, 'Register successful', token);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email }});
        if (!user) {
            return sendResponse.error(res, 400, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return sendResponse.error(res, 400, 'Invalid email or password');
        }

        const token = generateToken(user.id);
        return sendResponse.success(res, 200, 'Login Successful', token);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    register,
    login
}
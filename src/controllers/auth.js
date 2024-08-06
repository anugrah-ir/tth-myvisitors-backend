const User = require('../models/user');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/response');
require('dotenv').config;

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .has().lowercase()
    .has().uppercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces(); 

const validateEmail = (email) => {
    if (!emailValidator.validate(email)) {
        throw new Error('Please enter a valid email address.');
    }
};

const validatePassword = (password, passwordSchema) => {
    if (!passwordSchema.validate(password)) {
        throw new Error('Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
    }
};

const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
};

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        validateEmail(email);
        validatePassword(password, passwordSchema);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        const token = generateToken(user.id);

        return success(res, 200, true, "Register Successful", token);
    }
    catch (err) {
        return error(res, 400, false, err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        validateEmail(email);
        validatePassword(password, passwordSchema);

        const user = await User.findOne({ where: { email : email } });
        if (!user)
            throw "The email is not registered";

        if (!await bcrypt.compare(password, user.password))
            throw "Invalid email or password";

        const token = generateToken(user.id);

        return success(res, 200, true, "Login Successful", token);
    }
    catch (err) {
        return error(res, 400, false, err);
    }
};

module.exports = {
    register,
    login
}
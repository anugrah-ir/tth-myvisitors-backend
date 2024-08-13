const { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } = require('../utils/customError');
const { createUser, findUser } = require('../models/user');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        throw new BadRequestError('Please enter a valid email address.');
    }
};

const validatePassword = (password, passwordSchema) => {
    if (!passwordSchema.validate(password)) {
        throw new BadRequestError('Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
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

        if (await findUser({ email: email })) {
            throw new ConflictError('The email is already registered.');
        }
          
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ name, email, password: hashedPassword, role });
        const token = generateToken(user.id);

        res.sendSuccess(200, 'Register Successful', token);
    }
    catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        validateEmail(email);

        const user = await findUser({ email: email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = generateToken(user.id);
                res.sendSuccess(200, "Login Successful", token);
            }
            else {
                throw new UnauthorizedError('Invalid email or password');
            }
        }
        else {
            throw new NotFoundError('Invalid email or password');
        }
    }
    catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

module.exports = {
    register,
    login
}
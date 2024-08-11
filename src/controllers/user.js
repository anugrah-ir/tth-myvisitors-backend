const User = require('../models/user');
const { sendSucces, sendError } = require('../middlewares/responseHandler');
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../utils/customError');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });

        if (user) {
            res.sendSuccess(200, 'User created successfully.', user);
        } else {
            throw new BadRequestError('Failed to create user. Ensure all required fields are filled correctly.');
        }
    } catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

const findUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            res.sendSuccess(200, 'User found successfully.', user);
        } else {
            throw new NotFoundError('User not found. Please check the ID and try again.');
        }
    } catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

const updateUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            const { name, email, password, role } = req.body;
            const updatedUser = await user.update({ name, email, password, role });
            res.sendSuccess(200, 'User updated successfully.', updatedUser);
        } else {
            throw new NotFoundError('User not found. Please check the ID and try again.');
        }
    } catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

const deleteUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            const deletedUser = await user.destroy();
            res.sendSuccess(200, 'User deleted successfully.', deletedUser);
        }
        else {
            throw new NotFoundError('User not found. Please check the ID and try again.');
        }
    } catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
    }
};

module.exports = {
  createUser,
  findUserByID,
  updateUserByID,
  deleteUserByID,
};

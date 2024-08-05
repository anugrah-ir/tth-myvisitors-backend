const User = require('../models/user');
const { success, error } = require('../utils/response');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });

        if (user) {
            return success(res, 201, true, 'User created successfully.', user);
        } else {
            return error(res, 400, false, 'Failed to create user. Ensure all required fields are filled correctly.');
        }
    } catch (err) {
        return error(res, 500, false, err.message);
    }
};

const findUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            return success(res, 200, true, 'User found successfully.', user);
        } else {
            return error(res, 404, false, 'User not found. Please check the ID and try again.');
        }
    } catch (err) {
        return error(res, 500, false, err.message);
    }
};

const updateUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            const { name, email, password, role } = req.body;
            const updatedUser = await user.update({ name, email, password, role });
            return success(res, 200, true, 'User updated successfully.', updatedUser);
        } else {
            return error(res, 404, false, 'User not found. Please check the ID and try again.');
        }
    } catch (err) {
        return error(res, 500, false, err.message);
    }
};

const deleteUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (user) {
            const deletedUser = await user.destroy();
            return success(res, 200, true, 'User deleted successfully.', deletedUser);
        }
        else {
            return error(res, 404, false, 'User not found. Please check the ID and try again.');
        }
    } catch (err) {
        return error(res, 500, false, err.message);
    }
};

module.exports = {
  createUser,
  findUserByID,
  updateUserByID,
  deleteUserByID,
};

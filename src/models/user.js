const sequelize = require('../config/database');
const DataTypes = require('sequelize');
const { BadRequestError, NotFoundError } = require('../utils/customError');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'vendor', 'intern', 'visitor'),
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

const createUser = async (data) => {
    const user = await User.create(data);
    return user ? user: false;
};

const findUser = async (criteria) => {
    const user = await User.findOne({ where: criteria });
    return user ? user: false;
};

const updateUser = async (criteria, data) => {
    const user = await User.findOne({ where: criteria });
    const updatedUser = await user.update(data);
    return updatedUser ? updatedUser: false;
};

const deleteUser = async (criteria) => {
    const user = await User.findOne({ where: criteria });
    const deletedUser = await user.destroy();
    return deletedUser ? deletedUser: false;
};

module.exports = {
    createUser,
    findUser,
    updateUser,
    deleteUser
};
const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
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
    const user = await User.update(data, { where: criteria });
    return user ? user: false;
};

const deleteUser = async (criteria) => {
    const user = await User.destroy({ where: criteria });
    return user ? user: false;
};

module.exports = {
    User,
    createUser,
    findUser,
    updateUser,
    deleteUser
};
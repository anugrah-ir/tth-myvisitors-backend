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

module.exports = User;
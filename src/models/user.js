const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
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
        phoneNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        selfiePhoto: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'visitor', 'vendor', 'intern'),
            allowNull: false
        },
        companyIdPhoto: {
            type: DataTypes.STRING,
            unique: true
        },
        integrityPact: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = User;
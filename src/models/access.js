const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const Access = sequelize.define(
    'Access',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accessDocument: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Access;
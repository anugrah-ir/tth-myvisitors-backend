const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const Visit = sequelize.define(
    'Visit',
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
        employeeId: {
            type: DataTypes.INTEGER
        },
        purposeId: {
            type: DataTypes.INTEGER
        },
        customPurpose: {
            type: DataTypes.STRING
        },
        accessDocument: {
            type: DataTypes.STRING,
            unique: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        visitorCardNumber: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM('notStarted', 'ongoing', 'finished'),
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Visit;
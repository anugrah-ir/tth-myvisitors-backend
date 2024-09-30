const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const Room = sequelize.define(
    'Room',
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = Room;
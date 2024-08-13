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
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        userRelation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deviceLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        energyLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        calibrationLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        transmissionLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cableLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        SIRLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        FMCLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        ISRLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        BANLab: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        meetingRoom: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        digiconShowcase: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        timestamps: true
    }
);

const createAccess = async (data) => {
    const access = await Access.create(data);
    return access ? access: false;
};

const findAccess = async (criteria) => {
    const access = await Access.findOne({ where: criteria });
    return access ? access: false;
};

const updateAccess = async (criteria, data) => {
    const access = await Access.update(data, { where: criteria });
    return access ? access: false;
};

const deleteAccess = async (criteria) => {
    const access = await Access.destroy({ where: criteria });
    return access ? access: false;
};

module.exports = {
    Access,
    createAccess,
    findAccess,
    updateAccess,
    deleteAccess
};
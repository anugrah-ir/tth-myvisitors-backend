const sendResponse = require('../middlewares/responseHandler');
const Visit = require('../models/visit');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
const addVisit = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) throw new Error('Authorization token is missing');
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = data.id;

        const { roomId, pic, accessDocument  } = req.body;
        date = getCurrentDate();
        startTime = getCurrentTime();

        const visit = await Visit.create({ userId, roomId, employeeId: pic, accessDocument, date, startTime, status: "notStarted" });
        return sendResponse.success(res, 200, 'New Visit Added Successfully', visit);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const getAllVisits = async (req, res) => {
    try {
        const visits = await Visit.findAll();

        return sendResponse.success(res, 200, 'Visits found', visits);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
}

module.exports = {
    addVisit,
    getAllVisits
};
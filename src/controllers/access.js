const sendResponse = require('../middlewares/responseHandler');
const Access = require('../models/access');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const addAccess = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) throw new Error('Authorization token is missing');
      
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = data.id;

        const roomIds = JSON.parse(req.body.roomId);
        if (!Array.isArray(roomIds) || roomIds.length === 0) {
            throw new Error('Invalid roomId format or empty array');
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10));
        const startDateString = startDate.toISOString().slice(0, 19).replace('T', ' ');

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 10));
        const endDateString = endDate.toISOString().slice(0, 19).replace('T', ' ');

        const accessPromises = roomIds.map((roomId) =>
            Access.create({
                userId,
                roomId,
                accessDocument: req.file.filename,
                startDate: startDateString,
                endDate: endDateString,
            })
        );

        const accessCollection = await Promise.all(accessPromises);

        // Send the collection in the response
        sendResponse.success(res, 200, 'New Accesses Added Successfully', accessCollection);
    } catch (error) {
        console.error(error);
        sendResponse.error(res, 500, 'Internal Server Error', error.message);
    }
};


const getAllAccessByUserID = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = data.id;
        const access = await Access.findAll({ where: { userId: id }});
        if (!access) {
            return sendResponse.error(res, 404, 'Access Not Found');
        }

        return sendResponse.success(res, 200, 'Access Found.', access);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};
  



module.exports = {
    addAccess,
    getAllAccessByUserID
}
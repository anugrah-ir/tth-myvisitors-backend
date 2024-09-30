const sendResponse = require('../middlewares/responseHandler');
const Room = require('../models/room');

const addRoom = async (req, res) => {
    try {
        const { name } = req.body;

        const room = await Room.create({ name });
        return sendResponse.success(res, 200, 'New Room Added Successfully', room);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        return sendResponse.success(res, 200, 'All Rooms:', rooms);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id, name } = req.body;

        const room = await Room.findOne({ where: { id: id }});
        if (!room) {
            return sendResponse.error(res, 404, 'Room Not Found');
        }

        const updatedRoom = await room.update({ name });
        return sendResponse.success(res, 200, 'Room Updated Successfully', updatedRoom);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.body;

        const room = await Room.findOne({ where: { id: id }});
        if (!room) {
            return sendResponse.error(res, 404, 'Room Not Found');
        }

        await room.destroy();
        return sendResponse.success(res, 200, 'Room Deleted Successfully', room);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    addRoom,
    getAllRooms,
    updateRoom,
    deleteRoom
}
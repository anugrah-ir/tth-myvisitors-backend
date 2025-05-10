const express = require('express');
const roomRoute = express.Router();

const {
    addRoom,
    getRoomByID,
    getAllRooms,
    updateRoom,
    deleteRoom
} = require('../controllers/room');

roomRoute
    .post('/', addRoom)
    .get('/:id', getRoomByID)
    .get('/', getAllRooms)
    .put('/', updateRoom)
    .delete('/', deleteRoom);

module.exports = roomRoute;
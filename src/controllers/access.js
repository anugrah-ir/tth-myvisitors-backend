const sendResponse = require('../middlewares/responseHandler');
const Access = require('../models/access');

const addAccess = async (req, res) => {
    try {
        const { userId, roomId, startDate, endDate  } = req.body;
        const access = await Access.create({ userId, roomId, accessDocument: req.file.path, startDate, endDate });
        sendResponse.success(res, 200, 'New Access Added Successfully', access);
    }
    catch (error) {
        sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    addAccess
}
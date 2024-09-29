const sendResponse = require('../middlewares/responseHandler');
const { createAccess } = require('../models/access');

const addAccess = async (req, res) => {
    try {
        const { userID, startDate, endDate, userRelation, deviceLab, energyLab, calibrationLab, transmissionLab, cableLab, SIRLab, FMCLab, ISRLab, BANLab, meetingRoom, digiconShowcase } = req.body;
        const access = await createAccess({ userID, filePath: req.file.path, startDate, endDate, userRelation, deviceLab, energyLab, calibrationLab, transmissionLab, cableLab, SIRLab, FMCLab, ISRLab, BANLab, meetingRoom, digiconShowcase });
        sendResponse.success(res, 200, 'New Access Added', access);
    }
    catch (error) {
        sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    addAccess
}
const { BadRequestError } = require('../utils/customError');
const { createAccess } = require('../models/access');

const addAccess = async (req, res) => {
    try {
        const { userID, startDate, endDate, userRelation, deviceLab, energyLab, calibrationLab, transmissionLab, cableLab, SIRLab, FMCLab, ISRLab, BANLab, meetingRoom, digiconShowcase } = req.body;
        const access = await createAccess({ userID, filePath: req.file.path, startDate,endDate, userRelation, deviceLab, energyLab, calibrationLab, transmissionLab, cableLab, SIRLab, FMCLab, ISRLab, BANLab, meetingRoom, digiconShowcase });
        if (access) {
            res.sendSuccess(200, 'New Access Added', access);
        }
        else {
            throw new BadRequestError('Error try adding new access');
        }
    }
    catch (error) {
        res.sendError(error.statusCode, error.message, error.name);
        console.log(error);
    }
};

module.exports = {
    addAccess
}
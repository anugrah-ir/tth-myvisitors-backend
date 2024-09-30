const sendResponse = require('../middlewares/responseHandler');
const Purpose = require('../models/purpose');

const addPurpose = async (req, res) => {
    try {
        const { name } = req.body;

        const purpose = await Purpose.create({ name });
        return sendResponse.success(res, 200, 'New Purpose Added Successfully', purpose);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const getAllPurposes = async (req, res) => {
    try {
        const purposes = await Purpose.findAll();
        return sendResponse.success(res, 200, 'All Purposes:', purposes);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const updatePurpose = async (req, res) => {
    try {
        const { id, name } = req.body;

        const purpose = await Purpose.findOne({ where: { id: id }});
        if (!purpose) {
            return sendResponse.error(res, 404, 'Purpose Not Found');
        }

        const updatedPurpose = await purpose.update({ name });
        return sendResponse.success(res, 200, 'Purpose Updated Successfully', updatedPurpose);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const deletePurpose = async (req, res) => {
    try {
        const { id } = req.body;

        const purpose = await Purpose.findOne({ where: { id: id }});
        if (!purpose) {
            return sendResponse.error(res, 404, 'Purpose Not Found');
        }

        await purpose.destroy();
        return sendResponse.success(res, 200, 'Purpose Deleted Successfully', purpose);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    addPurpose,
    getAllPurposes,
    updatePurpose,
    deletePurpose
}
const sendResponse = require('../middlewares/responseHandler');
const Employee = require('../models/employee');

const addEmployee = async (req, res) => {
    try {
        const { name } = req.body;

        const employee = await Employee.create({ name });
        return sendResponse.success(res, 200, 'New Employee Added Successfully', employee);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        return sendResponse.success(res, 200, 'All Employees:', employees);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id, name } = req.body;

        const employee = await Employee.findOne({ where: { id: id }});
        if (!employee) {
            return sendResponse.error(res, 404, 'Employee Not Found');
        }

        const updatedEmployee = await employee.update({ name });
        return sendResponse.success(res, 200, 'Employee Updated Successfully', updatedEmployee);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.body;

        const employee = await Employee.findOne({ where: { id: id }});
        if (!employee) {
            return sendResponse.error(res, 404, 'Employee Not Found');
        }

        await employee.destroy();
        return sendResponse.success(res, 200, 'Employee Deleted Successfully', employee);
    }
    catch (error) {
        return sendResponse.error(res, 500, 'Internal Server Error', error);
    }
};

module.exports = {
    addEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
}
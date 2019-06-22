const express = require("express");

const employeeModel = require("./employee.model");

const employee = express.Router();

employee.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee details are there",
        employee: null
    });
});

module.exports = employee;
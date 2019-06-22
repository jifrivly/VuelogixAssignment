const express = require("express");

const adminModel = require("./admin.model");

const admin = express.Router();

admin.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee details are there",
        employee: null
    });
});

module.exports = admin;
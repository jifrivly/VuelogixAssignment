const express = require("express");
const passport = require("passport").Passport;

const adminModel = require("./admin.model");


const admin = express.Router();


// passport configuration
const adminPassport = new passport();
require("./admin.passport")(adminPassport);
admin.use(adminPassport.initialize());
admin.use(adminPassport.session());


// signup Route
admin.post("/signup", (req, res) => {
    var newAdmin = new adminModel(req.body);

    console.log(newAdmin);

    newAdmin
        .save()
        .then((result) => {
            console.log(result);
            res
                .status(200)
                .json({
                    success: true,
                    message: "Successfully created an admin account...",
                    data: result
                });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(400)
                .json({
                    success: false,
                    message: "An error occurred while creating an account for admin...",
                    data: err
                });
        });
});

// Login Route 
admin.post(
    "/login",
    adminPassport
        .authenticate(
            "local", {
                session: false,
                failureRedirect: "/admin/loginError"
            }),
    (req, res) => {
        console.log("post admin login route working");
        console.log(req.user);
        res.status(200)
            .json({
                success: true,
                message: "Authentication success"
            });
    });
// Login Error Route
admin.get("/loginError", (req, res) => {
    res.json({
        success: false,
        message: "Not Authenticated"
    });
});

// Home Route 
admin.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin details are there",
        admin: null
    });
});

module.exports = admin;


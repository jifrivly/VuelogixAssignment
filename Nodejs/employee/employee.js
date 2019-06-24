const express = require("express");
const passport = require("passport").Passport;

const employeeModel = require("./employee.model");


const employee = express.Router();


// passport configuration
const employeePassport = new passport();
require("./employee.passport")(employeePassport);
employee.use(employeePassport.initialize());
// employee.use(employeePassport.session());


// signup route
employee.post("/signup", (req, res) => {
    var employeeData = {
        name: req.body.name,
        position: req.body.position,
        work: {
            checked: false,
            firstDay: null,
            lastCheckTime: null,
            workTime: []
        },
        leave: { inLeave: null },
        email: req.body.email,
        password: req.body.password,
    };

    var newEmployee = new employeeModel(employeeData);

    console.log(newEmployee);

    newEmployee
        .save()
        .then((result) => {
            console.log(result);
            res
                .status(200)
                .json({
                    success: true,
                    message: "successfully created an employee account...",
                    data: result
                });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(400)
                .json({
                    success: false,
                    message: "An error occurred while creating an employee account...",
                    data: err
                });
        });
});

// login Route
employee.post(
    "/login",
    employeePassport.authenticate("local",
        {
            session: false,
            failureRedirect: "/employee/loginError"
        }),
    (req, res) => {
        console.log("post employee login route working");
        res.status(200)
            .json({
                success: true,
                message: "Authentication success"
            });
    });

employee.get("/loginError", (req, res) => {
    res.json({
        success: false,
        message: "Not authenticated"
    });
});


// checkedIn checkedOut Route
employee.get("/checkInOut/:id", (req, res) => {
    const id = req.params.id;
    employeeModel.findById(id, (err, employeeData) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Error occurred",
                error: err
            });
        }
        if (!employeeData) {
            res.status(403).json({
                success: false,
                message: "No data Found",
                data: null
            });
        }
        if (employeeData) {
            var checked = employeeData.work.checked;
            var firstDay = employeeData.work.firstDay;
            var lastCheckTime = employeeData.work.lastCheckTime;
            // var workTime = employeeData.work.workTime;

            // var d = new Date();
            var now = Date.now();

            if (firstDay == null) {
                employeeModel.updateOne({ _id: id }, { $set: { "work.firstDay": now } },
                    (err, data) => {
                        if (err) {
                            res.status(403).json({
                                success: false,
                                message: "Error occurred while changing first day...",
                                error: err
                            });
                        }
                        if (!data) {
                            res.status(403).json({
                                success: false,
                                message: "first day value not changed",
                                data: null
                            });
                        }
                    });
            }
            // changing the value of checked
            employeeModel.updateOne(
                { _id: id },
                { $set: { "work.checked": !checked, "work.lastCheckTime": now } },
                (err, data) => {
                    if (err) {
                        res.status(403).json({
                            success: false,
                            message: "Error occurred while changing checked...",
                            error: err
                        });
                    }
                    if (!data) {
                        res.status(403).json({
                            success: false,
                            message: "Value not changed",
                            data: null
                        });
                    }
                    if (data) {

                        if (checked) {
                            var time = now - lastCheckTime;
                            employeeModel.updateOne(
                                { _id: id },
                                { $push: { "work.workTime": time } },
                                (err, data) => {
                                    if (err) {
                                        res.status(403).json({
                                            success: false,
                                            message: "Error occurred while adding work time...",
                                            error: err
                                        });
                                    }
                                    if (data) {
                                        res.status(200).json({
                                            success: true,
                                            message: "Value changed and work time added...",
                                            data: data
                                        });
                                    }
                                });
                        } else {
                            if (data) {
                                res.status(200).json({
                                    success: true,
                                    message: "Value changed...",
                                    data: data
                                });
                            }
                        }

                    }
                });



        }
    });
});


// route to get employee details
employee.get("/list", (req, res) => {
    employeeModel
        .find()
        .then((employees) => {
            res.status(200).json({
                success: true,
                message: "Employees list and details are here",
                data: employees
            });
        }).catch((err) => {
            res.status(403).json({
                success: false,
                message: "Error occurred while fetching employee details...",
                data: null
            });
        });
});


// route to get employee details by ID
employee.get("/:id", (req, res) => {
    var id = req.params.id;
    employeeModel
        .findOne({ _id: id })
        .then((employee) => {
            res.status(200).json({
                success: true,
                message: "Employee details are here",
                data: employee
            });
        })
        .catch((err) => {
            res.status(403).json({
                success: false,
                message: "Error occurred while fetching employee details...",
                data: null
            });
        });
});


// main  Route
employee.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee details are there",
        data: null
    });
});


module.exports = employee;
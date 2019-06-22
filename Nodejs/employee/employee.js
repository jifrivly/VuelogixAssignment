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
            checked: null,
            lastCheckTime: null,
            workTime: null
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
    employeePassport.authenticate("local", { session: false }),
    (req, res) => {
        console.log("post employee login route working");
        res.status(200)
            .json({
                success: true,
                message: "Authentication success"
            });
    });

// employee.get("/checkInOut/:id",(req,res)=>{
//     employeeModel.findById(req.params.id)
// });

// main  Route
employee.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee details are there",
        employee: null
    });
});

module.exports = employee;
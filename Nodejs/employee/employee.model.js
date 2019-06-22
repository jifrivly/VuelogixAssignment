const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    work: {
        checked: Boolean,
        lastCheckTime: String,
        workTime: String
    },
    leave: {
        inLeave: Boolean

    },
    email: String,
    password: String
});


module.exports = mongoose.model("employee", employeeSchema);
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// mongo DB config
mongoose
    .connect("mongodb://localhost:27017/vuelogixDB", {
        useNewUrlParser: true
    })
    .then(data => {
        console.log(chalk.green("Connection Successfull...."));
    })
    .catch(err => {
        console.log(chalk.red("Not Connected.., Error occurred...."));
    });

const app = express();

// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/employee", require("./employee/employee"));
app.use("/admin", require("./admin/admin"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome.., This Home route working..."
    });
});

app.get("*", (req, res) => {
    res.status(403).json({
        success: false,
        message: "This route not exists..."
    });
});

const port = process.env.PORT || 4545;
app.listen(port, () => {
    console.log(chalk.blue(`listening on http://localhost:${port}`));
});

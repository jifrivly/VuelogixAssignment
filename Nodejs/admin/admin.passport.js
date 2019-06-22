// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const adminModel = require("./admin.model");


module.exports = function (adminPassport) {
    adminPassport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (username, password, done) => {
                adminModel.findOne({ email: username }, (err, user) => {
                    if (err) {
                        console.log("error occurred while checking admin login credentials .")
                        return done(err, false);
                    }
                    if (!user) {
                        console.log("No user found while checking admin login credentials .")
                        return done(null, false);
                    }
                    if (user) {
                        if (user.password != password) {
                            console.log("Username and Password not match while checking admin login credentials.")
                            return done(null, false);
                        } else {
                            console.log("admin login credentials are match login success")
                            // var token = jwt.sign({ user }, "1234", { expiresIn: 120 });
                            return done(null, user);
                        }
                    }
                });
            }
        )
    );
}
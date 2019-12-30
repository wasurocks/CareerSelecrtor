const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./api/users");
const profile = require("./api/profile");

// Used for setting environmental variables
// require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

// Database config
const db = require("./config/keys").mongoURI;

// Make a connection to MongoDB server
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes using /api/users set to direct to users file
app.use("/users", users);

// Routes using /api/profile set to direct to profile file
app.use("/profile", profile);

app.use('/test', (req, res) => {
    res.send('test complete!');
});

// 404 Error page to account for all situations
app.use('*', (req, res) => {
    res.status(404).send('Error');
});

// Set port as environmental variable or fallback as port 5000
const port = process.env.PORT || 5000;

// Set app to run on port
app.listen(port, () =>
    console.log(`Server started and running on port ${port}`)
);

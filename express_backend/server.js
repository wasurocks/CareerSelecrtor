const express = require('express');
const mongoose = require('mongoose');
// Used for setting environmental variables
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

// Database config
const db = require('./config/keys').mongoURI;

// Make a connection to MongoDB server
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

// Set port as environmental variable or fallback as port 5000
const port = process.env.PORT || 5000

// Set app to run on port
app.listen(port, () => console.log(`Server started and running on port ${port}`));
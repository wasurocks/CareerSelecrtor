const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cors());

// Make a connection to MongoDB server
const db = require("./model/database");
db.connect();

// Pass route handling to router
const router = require("./controller/router");
app.use("/", router);

// Set port as environmental variable or fallback as port 5000
const port = process.env.PORT || 5000;

// Set app to run on port
app.listen(port, () =>
    console.log(`Server started and running on port ${port}`)
);

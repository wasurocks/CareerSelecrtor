const mongoose = require("mongoose");

// URI of server
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vjl21.mongodb.net/FoodSelectorDB?retryWrites=true&w=majority`;

// Connect to mongoDB server
mongoose
    //  useNewUrlParser is an important property
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // outputs message once connection is established
    .then(() => console.log("Successfully connected to MongoDB!"))
    // catches any errors
    .catch(err => console.log(err));




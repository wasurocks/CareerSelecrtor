const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for users of the database
const FoodSchema = new Schema({
    name: {
        type: String
    },
    disp_name: {
        type: String
    },
    desc: {
        type: String
    },
    prop: {
        type: Object
    }
});

module.exports = Food = mongoose.model("food", FoodSchema, "food"); // IMPORTANT additional parameter 
// Enables access to existing database

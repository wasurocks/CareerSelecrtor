const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for users of the database
const FoodSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    },
    desc: {
        type: String
    },
    prop: {
        type: Object
    }
});

module.exports = Food = mongoose.model("food", FoodSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for users of the database
const CareerSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    },
    desc: {
        type: String
    }
});

module.exports = Career = mongoose.model("careers", CareerSchema);

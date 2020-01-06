const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for users of the database
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema, "users");

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
    },
    isAdmin: Boolean
});

module.exports = User = mongoose.model("users", UserSchema, "users");

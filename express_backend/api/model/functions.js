// Calls related to user
const User = require("../models/User");

function findUserByEmail(email) {
    return User.findOne({ email });
}

function createNewUser(email, password_hash) {
    User.insert({
        email,
        password: password_hash
    });
}

function deleteUserByEmail(email) {
    User.deleteOne({ email });
}

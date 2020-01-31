// Calls related to user
const User = require("./schema/user");
const Food = require("./schema/food");

// Finds user by email
function findUserByEmail(email) {
    return User.findOne({ email });
}

// Creates new user with email and password hash
function createNewUser(email, password_hash) {
    User.insert({
        email,
        password: password_hash
    });
}

// Deletes user
function deleteUserByEmail(email) {
    User.deleteOne({ email });
}

// Finds data item(s) by query
function findItemsByQuery(query) {
    return Food.find(query);
}

// Adds new data item
function insertItem(name, disp_name, desc, prop) {
    Food.insertOne({
        name,
        disp_name,
        desc,
        prop
    });
}

// Removes existing data item
function deleteItemByName(name) {
    Food.deleteOne({ name });
}

module.exports = {
    findUserByEmail,
    createNewUser,
    deleteUserByEmail,
    findItemsByQuery,
    insertItem,
    deleteItemByName
};
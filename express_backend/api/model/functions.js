// Calls related to user
const User = require("./schema/user");
const Food = require("./schema/food");

// Finds user by ID
function findUserByID(_id) {
    return User.findOne({ _id });
}

// Finds user by email
function findUserByEmail(email) {
    return User.findOne({ email });
}

// Creates new user with email and password hash
async function createNewUser(email, password_hash) {
    await User.create({
        email,
        password: password_hash
    });
}

// Deletes user
async function deleteUserByEmail(email) {
    await User.deleteOne({ email });
}

// Checks if user exists
function checkUserExistenceByQuery(query) {
    return User.countDocuments(query).limit(1);
}

// Finds data item(s) by query
function findItemsByQuery(query) {
    return Food.find(query);
}

// Checks if item exists
function checkItemExistenceByQuery(query) {
    return Food.countDocuments(query).limit(1);
}

// Adds new data item
async function insertItem(name, disp_name, desc, prop) {
    await Food.create({
        name,
        disp_name,
        desc,
        prop
    });
}

// Removes existing data item
async function deleteItemByName(name) {
    await Food.deleteOne({ name });
}

module.exports = {
    findUserByID,
    findUserByEmail,
    createNewUser,
    deleteUserByEmail,
    findItemsByQuery,
    insertItem,
    deleteItemByName,
    checkItemExistenceByQuery,
    checkUserExistenceByQuery
};
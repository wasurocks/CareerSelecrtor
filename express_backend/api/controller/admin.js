const AWS = require("aws-sdk");

const {
    insertItem,
    deleteItemByName,
    createNewUser,
    deleteUserByEmail
} = require("../model/functions");

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACESACCESSKEY,
    secretAccessKey: process.env.SPACESSECRETKEY
});

// Adds photo to a DigitalOcean Spaces bucket
async function addPhotoToBucket(name, file) {

    // Set parameters
    const params = {
        Body: file,
        Bucket: "foodselector",
        Key: `photos/${name}.jpg`,
        ContentEncoding: "7bit",
        ContentType: "image/jpeg"
    };

    await s3.putObject(params).promise().catch(err => console.error(err));
}

// Removes photo from a DigitalOcean Spaces bucket
async function removePhotoFromBucket(name) {

    // Sets parameters
    const params = {
        Bucket: "foodselector",
        Key: `photos/${name}.jpg`
    };

    await s3.deleteObject(params).promise().catch(err => console.error(err));
}

// Adds item:
// - photo => stored in bucket
// - data => stored in MongoDB collection
function addItem(req, res) {
    if(req.body.name && req.file) {
        addPhotoToBucket(req.body.name, req.file.buffer);
        return res.sendStatus(201);
    } 
    
    // If request parameters invalid
    return res.sendStatus(400);
}

// Removes an item from bucket and collection
function removeItem(req, res) {
    if(req.body.name) {
        removePhotoFromBucket(req.body.name);
        return res.sendStatus(200);
    }

    // If request parameters invalid
    return res.sendStatus(400);
}

// Creates a new user
function createUser() {}

// Deletes a user
function deleteUser() {}

module.exports = {
    addItem,
    removeItem
};

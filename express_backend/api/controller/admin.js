const AWS = require("aws-sdk");

const {
    findUserByEmail,
    insertItem,
    deleteItemByName,
    checkItemExistenceByQuery,
    checkUserExistenceByQuery,
    createNewUser,
    deleteUserByEmail
} = require("../model/functions");
const {
    hashPassword
} = require("./users");

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

    await s3
        .putObject(params)
        .promise()
        .catch(err => {
            throw err;
        });
}

// Removes photo from a DigitalOcean Spaces bucket
async function removePhotoFromBucket(name) {
    // Sets parameters
    const params = {
        Bucket: "foodselector",
        Key: `photos/${name}.jpg`
    };

    await s3
        .deleteObject(params)
        .promise()
        .catch(err => {
            throw err;
        });
}

// Adds item:
// - photo => stored in bucket
// - data => stored in MongoDB collection
async function addItem(req, res) {
    // Destructures the request body
    const { name, disp_name, desc, prop } = req.body;
    // Finds if a matching item exists
    const itemCount = await checkItemExistenceByQuery({ name });
    // If a match exists, return a conflict status
    if (itemCount !== 0) return res.sendStatus(409);
    // Add item to both the image store and db
    if (name && req.file && disp_name && desc && prop) {
        addPhotoToBucket(name, req.file.buffer);
        // CHANGE OR NOT json.parse
        insertItem(name, disp_name, desc, JSON.parse(prop));
        return res.sendStatus(201);
    }

    // If request parameters invalid
    return res.sendStatus(400);
}

// Removes an item from bucket and collection
function removeItem(req, res) {
    // Sets name equal to the request content name
    const name = req.body.name;
    // Finds if the request has a name parameter
    if (name) {
        try {
            // Removes item from image store and db
            removePhotoFromBucket(name);
            deleteItemByName(name);

            // Returns OK status
            return res.sendStatus(200);
        } catch (err) {
            // Invalid operations
            console.log("Operation invalid");
        }
    }

    // If request parameters invalid
    return res.sendStatus(400);
}

// Creates a new user
async function createUser(req, res) {
    // Destructure the request body
    const { email, password } = req.body;
    // Finds if a matching item exists
    const itemCount = await checkUserExistenceByQuery({ email });
    // If a match exists, return a conflict status
    if (itemCount !== 0) return res.sendStatus(409);
    // Add user to the db
    if(email && password) {
        createNewUser(email, await hashPassword(password));
        return res.sendStatus(201);
    }

    // If request parameters invalid
    return res.sendStatus(400);
}

// Deletes a user
function deleteUser(req, res) {
    // Sets email equal to the request content email
    const email = req.body.email;
    // Finds if the request has an email parameter
    if (email) {
        try {
            // Removes user from db
            deleteUserByEmail(email);

            // Returns OK status
            return res.sendStatus(200);
        } catch (err) {
            // Invalid operations
            console.log("Operation invalid");
        }
    }

    // If request parameters invalid
    return res.sendStatus(400);
}

module.exports = {
    addItem,
    removeItem,
    createUser,
    deleteUser
};

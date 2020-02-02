const AWS = require("aws-sdk");

const { findItemsByQuery } = require("../model/functions");

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACESACCESSKEY,
    secretAccessKey: process.env.SPACESSECRETKEY
});

// Process the search object for mongoDB query
function refilter(obj) {
    return Object.keys(obj)
        .filter(key => obj[key] !== null)
        .map(key => {
            let emptyObj = {};
            emptyObj[`prop.${key}`] = obj[key];
            return emptyObj;
        });
}

// Returns the temporary URL of a given filename
function getPhotoUrl(name) {
    const params = {
        Bucket: "foodselector",
        Key: `photos/${name}.jpg`,
        Expires: 60
    };
    return s3.getSignedUrl("getObject", params);
}

// Obtains items from a search operation
// showAll => show all items
async function getResults(req, res, showAll = false) {
    let foods = {};

    // Checks if only current results are required and if searchparams is supplied
    if (!showAll && req.body.searchparams)
        foods = await findItemsByQuery({
            $and: refilter(req.body.searchparams)
        }).catch(err => console.error(err));
    else if (showAll)
        foods = await findItemsByQuery({}).catch(err => console.error(err));
    else return res.sendStatus(400);

    // If there are no returned items
    if (!foods) return res.sendStatus(404);

    // Stores all returned items and responds with a json file
    const validitems = {};
    foods.map(food => {
        validitems[food.name] = {
            name: food.disp_name,
            desc: food.desc,
            img_url: getPhotoUrl(food.name)
        };
    });

    return res.status(200).json(validitems);
}

module.exports = {
    getResults
};

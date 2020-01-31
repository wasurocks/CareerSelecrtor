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
async function getPhotoUrl(name) {
    const params = {
        Bucket: "foodselector",
        Key: `photos/${name}.jpg`,
        Expires: 60
    };
    await s3
        .getSignedUrl("getObject", params)
        .promise()
        .catch(err => console.error(err));
}

// Obtains items from a search operation
// showAll => show all items
async function getResults(req, res, showAll = false) {
    let foods = {};

    if (!showAll)
        foods = await findItemsByQuery({
            $and: refilter(req.body.searchparams)
        }).catch(err => console.error(err));
    else foods = await findItemsByQuery({}).catch(err => console.error(err));

    if (!foods) return res.sendStatus(404);

    const validitems = {};
    foods.map(food => {
        validitems[food.name] = {
            name: food.disp_name,
            desc: food.desc,
            img_url: getPhotoUrl(food.name)
        };
        if (showAll) validitems[food.name].prop = food.prop;
    });

    return res.status(200).json(validitems);
}

module.exports = {
    getResults
};

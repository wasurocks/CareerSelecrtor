const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const AWS = require("aws-sdk");

// Load Food model
const Food = require("../models/Food");

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACESACCESSKEY,
    secretAccessKey: process.env.SPACESSECRETKEY
});

// authenticate() verifies user before allowing further access

// @route POST api/data/
// @desc Obtain data
// @access Token bearer
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Code in here guarded by authentication
        Food.find({ prop: req.body.searchparams })
            .then(foods => {
                // Check if the foods object exists
                if (!foods) {
                    return res
                        .status(404)
                        .json({ itemsnotfound: "No matching items." });
                }
                const validitems = {};
                foods.forEach(food => {
                    const url = s3.getSignedUrl("getObject", {
                        Bucket: "foodselector",
                        Key: `photos/${food.name}.jpg`,
                        Expires: 60
                    });
                    validitems[food.name] = {
                        name: food.disp_name,
                        desc: food.desc,
                        img_url: url
                    };
                });
                res.status(200).json(validitems);
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;

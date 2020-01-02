const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Food model
const Food = require("../models/Food");

// authenticate() verifies user before allowing further access

// @route POST api/data/
// @desc Obtain data
// @access Token bearer
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // DO SHIT HERE LMAO
        
    }
);

module.exports = router;
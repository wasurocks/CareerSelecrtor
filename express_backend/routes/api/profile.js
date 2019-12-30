const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post('/', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.headers);
    }
);

module.exports = router;
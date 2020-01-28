const express = require("express");
const passport = require("passport");
const router = express.Router();

// POST /api/login
router.post("/login", (req, res) => login(req, res));

// POST /api/register
router.post("/register", (req, res) => register(req, res));

router.use(passport.authenticate("jwt", { session: false }));

// GET /api/data/{filter}
// current-results => obtains items based on parameters
// view-all => returns all items in the database collection
router.get("/data/:filter", (req, res) => {
    switch (req.params.filter) {
        case "current-results":
            res.send("1");
            break;
        case "view-all":
            res.send("2");
            break;
        default:
            res.sendStatus(404);
    }
});

// 404 Error page for invalid links
router.use("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = router;

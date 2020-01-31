const express = require("express");
const passport = require("passport");
const router = express.Router();
const { login, register } = require("../controller/users");
const { getResults } = require("../controller/data");
const { addItem, removeItem } = require("../controller/admin");
const multer = require("multer");
const upload = multer();

// POST /api/login
// content-type = application/json
// Login for users
router.post("/login", (req, res) => login(req, res));

// POST /api/register
// content-type = application/json
// Registration for new users
router.post("/register", (req, res) => register(req, res));

// POST /api/admin/upload
// content-type = application/x-www-form-urlencoded
// Upload a single new item
router.post("/admin/upload", upload.single("image"), (req, res) => {
    if (req.body.name && req.file) {
        addItem(req.body.name, req.file.buffer);
        res.sendStatus(201);
    } else res.sendStatus(400);
});

// POST /api/admin/delete
// content-type = application/x-www-form-urlencoded
// Delete a single item
router.post("/admin/delete", upload.none(), (req, res) => {
    if (req.body.name) {
        removeItem(req.body.name);
        res.sendStatus(200);
    } else res.sendStatus(400);
});

// Routes after this are only for authorized users
router.use(passport.authenticate("jwt", { session: false }));

// POST /api/data/current-results
// content-type = application/json
// Displays current results based on request parameters
router.post("/data/current-results", (req, res) => {
    getResults(req, res);
});

// GET /api/data/view-all
// content-type = application/json
// Displays all results stored on database
router.get("/data/view-all", (req, res) =>
    getResults(req, res, (showAll = true))
);

// PUT ADMIN HERE

module.exports = router;

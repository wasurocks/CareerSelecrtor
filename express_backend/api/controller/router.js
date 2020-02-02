const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/users");
const { getResults } = require("../controller/data");
const { addItem, removeItem, validateAdmin } = require("../controller/admin");
const { checkAdminStatus, checkUserStatus, authenticateToken } = require("./auth");
const multer = require("multer");
const upload = multer();

/* 
    @ POST /api/login
    @ content-type = application/json
    @ Login for existing users

    @ parameters
        email: email address
        password: password
*/
router.post("/login", (req, res) => login(req, res));

/* 
    @ POST /api/register
    @ content-type = application/json
    @ Registration for new users

    @ parameters
        email: email address
        password: password
        password2: confirm password
*/
router.post("/register", (req, res) => register(req, res));

// Routes after this are only for authorized users
router.use([authenticateToken, checkUserStatus]);

/*  
    @ POST /api/admin/current-results
    @ content-type = application/json
    @ Searches for items from specified parameters

    @ parameters
        searchparams: object containing parameters to search for
*/
router.post("/data/current-results", (req, res) => getResults(req, res));

/*
    @ GET /api/data/view-all
    @ content-type = application/json
    @ Displays all results stored on database

    @ parameters

*/
router.get("/data/view-all", (req, res) =>
    getResults(req, res, (showAll = true))
);

// Routes after this are only for users with admin-access
router.use([authenticateToken, checkAdminStatus, checkUserStatus]);

/* 
    @ PUT /api/admin/upload
    @ content-type = application/x-www-form-urlencoded
    @ Upload a single new item

    @ parameters
        image: image file
        name: item name for reference
        disp_name: display name
        desc: description
        prop: properties of an item
*/
router.put("/admin/upload", upload.single("image"), (req, res) =>
    addItem(req, res)
);

/*  
    @ DELETE /api/admin/delete
    @ content-type = application/x-www-form-urlencoded
    @ Deletes a single item

    @ parameters
        name: item name for reference
*/
router.delete("/admin/delete", upload.none(), (req, res) => removeItem(req, res));

/*  
    @ POST /api/admin/create-user
    @ content-type = application/json
    @ Creates a new user

    @ parameters
        email: email address
        password: password
*/
/*router.post("/admin/create-user", (req, res) => {
    // MODIFY BELOW 
    if (req.body.name && req.file) {
        addItem(req.body.name, req.file.buffer);
        res.sendStatus(201);
    } else res.sendStatus(400);
});*/

module.exports = router;

const jwt = require("jsonwebtoken");
const { findUserByID } = require("../model/functions");

// Decodes a token given a secret key
function decodeToken(token, secret) {
    return jwt.verify(token, secret);
}

// Extract token from an authorization header
function extractToken(req) {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.substring(0, 7))
        return authHeader.substring(7, authHeader.length);
    return false;
}

// Middleware for authenticating token
function authenticateToken(req, res, next) {
    const token = extractToken(req);
    // No token provided
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.SECRETORKEY);
        // Set req.user to the decoded token
        req.user = decoded;
        // Moves to next middleware
        next();
    } catch (err) {
        // Invalid information
        console.log(err);
        return res.sendStatus(401);
    }
}

// Middleware for checking if the user is in the database, dependent on authenticateToken()
async function checkUserStatus(req, res, next) {
    // Sets user
    try {
        const user = await findUserByID(req.user.id);
        if (!user) return res.sendStatus(401);
        next();
    } catch (err) {
        return res.sendStatus(404);
    }
}

// Middleware for checking if user has admin privileges, dependent on authenticateToken()
function checkAdminStatus(req, res, next) {
    // If the user isn't an admin, return forbidden
    if (!req.user.isAdmin) return res.sendStatus(403);
    // If the user is an admin, move on
    next();
}

module.exports = {
    authenticateToken,
    decodeToken,
    checkAdminStatus,
    checkUserStatus
};

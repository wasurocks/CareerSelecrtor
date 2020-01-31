const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    findUserByEmail,
    createNewUser,
    deleteUserByEmail
} = require("../model/functions");

// Hash function to hash password
async function hashPassword(password) {
    // Set rounds of salting
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });

    return hashedPassword;
}

// Compares password with its hash
function comparePassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
}

function signAndGetToken(payload) {
    // Sign token
    return jwt.sign(payload, process.env.SECRETORKEY, {
        expiresIn: 31556926 // 1 year in seconds
    });
}

function validateLoginInput(data) {
    // Set errors to empty object
    let errors = {};

    // Convert empty fields to an empty string to use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
    else if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

    // Password checks
    if (Validator.isEmpty(data.password))
        errors.password = "Password field is required";

    // Return object of errors and validity-check boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

function validateRegisterInput(data) {
    // Set errors to empty object
    let errors = {};

    // Convert empty fields to an empty string to use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Email checks
    if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
    else if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

    // Password checks
    if (Validator.isEmpty(data.password))
        errors.password = "Password field is required";
    if (Validator.isEmpty(data.password2))
        errors.password2 = "Confirm password field is required";

    if (!Validator.isLength(data.password, { min: 6, max: 12 }))
        errors.password = "Password must be between 6 to 12 characters";

    if (!Validator.equals(data.password, data.password2))
        errors.password2 = "Passwords must match";

    // Return object of errors and validity-check boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

async function login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    // Checks existing users
    const user = await findUserByEmail(email);

    // If user exists and password matches, return a token
    if (await comparePassword(password, user.password) && user) {
        const payload = {
            id: user.id,
            email: user.email
        };
        const token = await signAndGetToken(payload);
        return res.status(201).json({
            success: true,
            token: "Bearer " + token
        });
    }

    // If user doesn't exist or password doesn't match, do nothing
    return res.sendStatus(404);
}

async function register(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    // Checks existing users
    if (await findUserByEmail(email))
        return res.status(400).json({ email: "User already exists" });

    // If user doesn't exist, create a new user
    createNewUser(email, hashPassword(password));
    return res.sendStatus(201);
}

module.exports = {
    login,
    register
};

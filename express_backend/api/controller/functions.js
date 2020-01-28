const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

function comparePassword(password1, password2) {
    return bcrypt.compare(password1, password2);
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

async function login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ emailnotfound: "User not found" });
    if (await comparePassword(password, user.password)) {
        const payload = {
            email: user.email
        };
        const token = await signAndGetToken(payload);
        res.status(201).json({
            success: true,
            token: "Bearer " + token
        });
    } else
        return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
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

async function register(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    if (await findUserByEmail(email))
        return res.status(400).json({ email: "User already exists" });
    else createNewUser(email, hashPassword(password));
}

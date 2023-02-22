const jwt = require("jsonwebtoken");

// Generate token
exports.makeToken = (email) => {
    return jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );
};

import jwt from "jsonwebtoken";

const { sign } = jwt;

// Generate token
export function makeToken(email) {
    return sign(
        { email },
        process.env.TOKEN_KEY,
        { expiresIn: "60s" }
    );
}

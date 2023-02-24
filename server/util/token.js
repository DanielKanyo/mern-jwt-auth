import jwt from "jsonwebtoken";

const { sign } = jwt;

// Generate token
export function makeToken(email, expiresIn) {
    return sign(
        { email },
        process.env.TOKEN_KEY,
        { expiresIn }
    );
}

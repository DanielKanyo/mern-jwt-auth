import { verify } from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header('sessionToken');

    if (!token) {
        return res.status(403).send("Forbidden...");
    }

    try {
        const decoded = verify(token, process.env.TOKEN_KEY);

        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Unauthorized...");
    }

    return next();
};

export default auth;

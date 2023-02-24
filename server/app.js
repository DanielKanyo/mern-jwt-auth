import express from "express";
import cors from "cors";
import dbConnect from "./config/database.js";
import User from "./model/user.js";
import nodeMailer from "nodemailer";
import auth from "./middleware/auth.js";
import { makeToken } from "./util/token.js";

dbConnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { BASE_URL } = process.env;
const CLIENT_PORT = process.env.VITE_CLIENT_PORT;

// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { name, email } = req.body;

        // Validate user input
        if (!(email && name)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exists... Please login");
        }

        // Create user in our database
        const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
        });

        // Return new user
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Set up email
const transport = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const emailTemplate = ({ email, link }) => {
    return `
        <h2>Hey ${email}</h2>
        <p>Here's the login link you just requested:</p>
        <a href="${link}">Click here to login</p>
    `;
};

// Login
app.post("/login", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("You did not enter a valid email address...");
    }

    const token = makeToken(email, "60s");

    const mailOptions = {
        from: "Madelyn Herzog",
        html: emailTemplate({
            email,
            link: `${BASE_URL}:${CLIENT_PORT}?token=${token}`,
        }),
        subject: "Link to login...",
        to: email,
    };

    return transport.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(404).send("Can't send email...");
        } else {
            return res.status(200).send(`Link sent...`);
        }
    });
});

// Validate account
app.get("/authenticate", auth, (req, res) => {
    const { email } = req.user;
    const sessionToken = makeToken(email, "24h");

    res.status(200).send(sessionToken);
});

// Get account
app.get("/account", auth, async (req, res) => {
    const { email } = req.user;

    const user = await User.findOne({ email });

    res.status(200).send(user);
});

export default app;

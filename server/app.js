require("./config/database").connect();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const tokenUtil = require("./util/token");
const nodeMailer = require("nodemailer");
const auth = require("./middleware/auth");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importing user context
const User = require("./model/user");

// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email } = req.body;

        // Validate user input
        if (!(email && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exists... Please login");
        }

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
        });

        // Create token
        const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        // Save user token
        user.token = token;

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

    const token = tokenUtil.makeToken(email);

    const mailOptions = {
        from: "Madelyn Herzog",
        html: emailTemplate({
            email,
            link: `http://localhost:${port}/account?token=${token}`,
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
app.get("/account", auth, (req, res) => {
    res.status(200).send("User has been validated...");
});

module.exports = app;

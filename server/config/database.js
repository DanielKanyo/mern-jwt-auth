import { set, connect } from "mongoose";
const { MONGO_URI } = process.env;

set("strictQuery", true);

async function dbConnect() {
    // Connecting to the database
    connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("Database connection failed... Exiting now...");
            console.error(error);
            process.exit(1);
        });
}

export default dbConnect;

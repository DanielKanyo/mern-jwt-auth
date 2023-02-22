import "dotenv/config";
import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

// Server listening
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

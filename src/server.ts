import app from "./app";
import dotenv from "dotenv";
import log from "./utils/logger";

dotenv.config();

const server_port = process.env.SERVER_PORT || 3000
app.listen(server_port, () => log.info(`[Server] listening on port ${server_port}`))
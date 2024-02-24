import express from "express";
import type {Express} from "express";
import dotenv from "dotenv";
import api from "./api";

dotenv.config()

const app: Express = express();
app.use("/api", api)

export default app;
import express from "express";
import type {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import api from "./api";

dotenv.config()

const app: Express = express();
app.use(morgan("dev"));


app.use("/api", api)
export default app;
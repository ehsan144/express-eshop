import express from "express";
import type {Express} from "express";
import {UserRouter} from "./user";

const api: Express = express()
api.use(express.json());

api.use("/user", UserRouter)

export default api;

import express from "express";
import type {Express} from "express";
import {AuthRouter} from "./auth";

const api: Express = express()
api.use(express.json());

api.use("/auth", AuthRouter)

export default api;

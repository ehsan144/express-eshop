import express from "express";
import type {Express} from "express";
import {AuthRouter} from "./auth";
import {ProductRouter} from "./product";

const api: Express = express()


api.use("/auth", AuthRouter)
api.use("/product", ProductRouter)

export default api;

import express from "express";
import type {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {json, urlencoded} from "body-parser";
import api from "./api";
import openapiSpecification from "./utils/swagger.config";


dotenv.config()

const app: Express = express();
app.use(morgan("dev"));
app.use(urlencoded({extended: false}))
app.use(json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", api)


export default app;
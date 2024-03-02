import express from "express";
import type {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import api from "./api";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./utils/swagger.config";

dotenv.config()

const app: Express = express();
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api", api)
export default app;
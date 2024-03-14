import express from "express";
import type {Express, Response, Request} from "express";
import {body, param} from "express-validator"

const router: Express = express();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({"a": "a"})
})
export default router;